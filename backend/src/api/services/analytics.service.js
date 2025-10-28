
const Chef = require('../models/chef.model');
const Order = require('../models/order.model');
const Client = require('../models/client.model');


/**
 * Gets a list of chefs and their completed order counts.
 */
const getChefPerformance = async () => {
    const performanceData = await Order.aggregate([
        // Step 1: Only consider orders that are completed and have a chef assigned
        { $match: { status: { $in: ['Served', 'Done'] }, chef: { $exists: true } } },

        // Step 2: Group orders by chef and count them
        { $group: { _id: "$chef", orderCount: { $sum: 1 } } },

        // Step 3: Fetch the chef's name from the 'chefs' collection
        {
            $lookup: {
                from: 'chefs',       // The collection to join with
                localField: '_id',   // The field from the input documents (our chef ID)
                foreignField: '_id', // The field from the documents of the "from" collection
                as: 'chefDetails'    // The name of the new array field to add
            }
        },

        // Step 4: Deconstruct the chefDetails array to a single object
        { $unwind: "$chefDetails" },

        // Step 5: Format the final output
        {
            $project: {
                _id: 0, // Exclude the default _id field
                chefName: "$chefDetails.name",
                ordersTaken: "$orderCount"
            }
        },

        // Step 6: Sort by the chef's name
        { $sort: { chefName: 1 } }
    ]);

    return performanceData;
};
//

const getDashboardAnalytics = async () => {
    // We use Promise.all to run all these database queries in parallel for better performance.
    const [totalRevenue, totalOrders, totalClients, totalChefs] = await Promise.all([
        // 1. Calculate Total Revenue from completed orders
        Order.aggregate([
            { $match: { status: { $in: ['Served', 'Done'] } } }, // Only count completed orders
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]),
        // 2. Count all orders
        Order.countDocuments(),
        // 3. Count all unique clients
        Client.countDocuments(),
        // 4. Count all chefs
        Chef.countDocuments()
    ]);

    // The aggregation for revenue returns an array, so we handle that.
    const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;

    return {
        totalRevenue: revenue,
        totalOrders,
        totalClients,
        totalChefs
    };
};

/**
 * Gets data for the revenue chart based on a time period.
 */
const getRevenueChartData = async (period) => {
    const today = new Date();

    switch (period) {
        case 'weekly':
            return await getWeeklyRevenueData(today);
        case 'monthly':
            return await getMonthlyRevenueData(today);
        case 'daily':
        default:
            return await getDailyRevenueData(today);
    }
};

const getDailyRevenueData = async (today) => {
    const days = [];
    const dateMap = new Map();

    // Create a map of the last 7 days with revenue initialized to 0
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dayKey = date.toISOString().split('T')[0];
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

        dateMap.set(dayKey, { name: dayName, revenue: 0 });
    }

    // Fetch the actual orders from the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const revenueData = await Order.aggregate([
        { $match: { createdAt: { $gte: sevenDaysAgo }, status: { $in: ['Served', 'Done'] } } },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                totalRevenue: { $sum: '$totalAmount' }
            }
        }
    ]);

    // Fill in the map with the actual revenue data
    revenueData.forEach(item => {
        if (dateMap.has(item._id)) {
            dateMap.get(item._id).revenue = item.totalRevenue;
        }
    });

    return Array.from(dateMap.values());
};

const getWeeklyRevenueData = async (today) => {
    const weeks = [];
    const weekMap = new Map();

    // Create a map of the last 12 weeks
    for (let i = 11; i >= 0; i--) {
        const weekStart = new Date();
        weekStart.setDate(today.getDate() - (i * 7) - today.getDay()); // Start from Sunday
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        const weekKey = weekStart.toISOString().split('T')[0];
        const weekLabel = `Week ${12 - i}`; // Or use date range: `${formatDate(weekStart)} - ${formatDate(weekEnd)}`

        weekMap.set(weekKey, {
            name: weekLabel,
            revenue: 0,
            startDate: weekStart,
            endDate: weekEnd
        });
    }

    // Calculate date for 12 weeks ago
    const twelveWeeksAgo = new Date();
    twelveWeeksAgo.setDate(today.getDate() - (12 * 7));
    twelveWeeksAgo.setHours(0, 0, 0, 0);

    const revenueData = await Order.aggregate([
        { $match: { createdAt: { $gte: twelveWeeksAgo }, status: { $in: ['Served', 'Done'] } } },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    week: { $week: "$createdAt" }
                },
                totalRevenue: { $sum: '$totalAmount' }
            }
        }
    ]);

    // Process weekly data
    revenueData.forEach(item => {
        const weekStart = new Date();
        weekStart.setDate(today.getDate() - today.getDay() - (11 - item._id.week) * 7);
        weekStart.setHours(0, 0, 0, 0);

        const weekKey = weekStart.toISOString().split('T')[0];

        if (weekMap.has(weekKey)) {
            weekMap.get(weekKey).revenue = item.totalRevenue;
        }
    });

    return Array.from(weekMap.values()).map(week => ({
        name: week.name,
        revenue: week.revenue
    }));
};

const getMonthlyRevenueData = async (today) => {
    const months = [];
    const monthMap = new Map();

    // Create a map of the last 12 months
    for (let i = 11; i >= 0; i--) {
        const monthDate = new Date();
        monthDate.setMonth(today.getMonth() - i);
        monthDate.setDate(1);
        monthDate.setHours(0, 0, 0, 0);

        const monthKey = monthDate.toISOString().split('T')[0];
        const monthName = monthDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });

        monthMap.set(monthKey, {
            name: monthName,
            revenue: 0,
            monthDate: monthDate
        });
    }

    // Calculate date for 12 months ago
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(today.getMonth() - 11);
    twelveMonthsAgo.setDate(1);
    twelveMonthsAgo.setHours(0, 0, 0, 0);

    const revenueData = await Order.aggregate([
        { $match: { createdAt: { $gte: twelveMonthsAgo }, status: { $in: ['Served', 'Done'] } } },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" }
                },
                totalRevenue: { $sum: '$totalAmount' }
            }
        }
    ]);

    // Process monthly data
    revenueData.forEach(item => {
        const monthDate = new Date();
        monthDate.setFullYear(item._id.year);
        monthDate.setMonth(item._id.month - 1);
        monthDate.setDate(1);
        monthDate.setHours(0, 0, 0, 0);

        const monthKey = monthDate.toISOString().split('T')[0];

        if (monthMap.has(monthKey)) {
            monthMap.get(monthKey).revenue = item.totalRevenue;
        }
    });

    return Array.from(monthMap.values()).map(month => ({
        name: month.name,
        revenue: month.revenue
    }));
};

// Helper function to format dates (optional)
const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};


// /**
//  * Gets the order summary (dine-in, takeaway, served) for a period.
//  */
// const getOrderSummary = async (period) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // Start of today
//     const tomorrow = new Date(today);
//     tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow

//     const result = await Order.aggregate([
//         { $match: { createdAt: { $gte: today, $lt: tomorrow } } },
//         {
//             $group: {
//                 _id: null,
//                 dineIn: { $sum: { $cond: [{ $eq: ['$orderType', 'Dine-In'] }, 1, 0] } },
//                 takeAway: { $sum: { $cond: [{ $eq: ['$orderType', 'Takeaway'] }, 1, 0] } },
//                 served: { $sum: { $cond: [{ $eq: ['$status', 'Served'] }, 1, 0] } }
//             }
//         }
//     ]);

//     return result[0] || { dineIn: 0, takeAway: 0, served: 0 };
// };


const getOrderSummary = async (period) => {

    switch (period) {
        case 'weekly':
            return await getWeeklyOrderSummary();
        case 'monthly':
            return await getMonthlyOrderSummary();
        case 'daily':
        default:
            return await getDailyOrderSummary();
    }
};

const getDailyOrderSummary = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const result = await Order.aggregate([
        { $match: { createdAt: { $gte: today, $lt: tomorrow } } },
        {
            $group: {
                _id: null,
                dineIn: { $sum: { $cond: [{ $eq: ['$orderType', 'Dine-In'] }, 1, 0] } },
                takeAway: { $sum: { $cond: [{ $eq: ['$orderType', 'Takeaway'] }, 1, 0] } },
                served: { $sum: { $cond: [{ $eq: ['$status', 'Served'] }, 1, 0] } }
            }
        }
    ]);

    return result[0] || { dineIn: 0, takeAway: 0, served: 0 };
};

const getWeeklyOrderSummary = async () => {
    const today = new Date();
    const startOfWeek = new Date();
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start from Sunday
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);
    endOfWeek.setHours(23, 59, 59, 999);

    const result = await Order.aggregate([
        { $match: { createdAt: { $gte: startOfWeek, $lt: endOfWeek } } },
        {
            $group: {
                _id: null,
                dineIn: { $sum: { $cond: [{ $eq: ['$orderType', 'Dine-In'] }, 1, 0] } },
                takeAway: { $sum: { $cond: [{ $eq: ['$orderType', 'Takeaway'] }, 1, 0] } },
                served: { $sum: { $cond: [{ $eq: ['$status', 'Served'] }, 1, 0] } }
            }
        }
    ]);

    return result[0] || { dineIn: 0, takeAway: 0, served: 0 };
};

const getMonthlyOrderSummary = async () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    const result = await Order.aggregate([
        { $match: { createdAt: { $gte: startOfMonth, $lt: endOfMonth } } },
        {
            $group: {
                _id: null,
                dineIn: { $sum: { $cond: [{ $eq: ['$orderType', 'Dine-In'] }, 1, 0] } },
                takeAway: { $sum: { $cond: [{ $eq: ['$orderType', 'Takeaway'] }, 1, 0] } },
                served: { $sum: { $cond: [{ $eq: ['$status', 'Served'] }, 1, 0] } }
            }
        }
    ]);

    return result[0] || { dineIn: 0, takeAway: 0, served: 0 };
};

module.exports = {
    getDashboardAnalytics, getRevenueChartData, getOrderSummary, getChefPerformance
};