const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const cron = require('node-cron');
const subscriptionRoutes = require('./routes/subscriptions');
const Subscription = require('./models/subscription');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use('/api/subscriptions', subscriptionRoutes);

// Connect to DB and sync
sequelize.sync()
  .then(() => console.log("Database & tables created"))
  .catch(err => console.log(err));

// Daily cron job for upcoming renewals
cron.schedule('0 8 * * *', async () => {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const upcomingRenewals = await Subscription.findAll({
    where: { renewalDate: { [sequelize.Op.between]: [today, nextWeek] } }
  });

  upcomingRenewals.forEach(sub => {
    console.log(`Reminder: ${sub.name} renews soon on ${sub.renewalDate.toDateString()}`);
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
