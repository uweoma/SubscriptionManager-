const apiUrl = 'http://localhost:5000/api/subscriptions';

async function fetchSubscriptions() {
  const res = await fetch(apiUrl);
  const subscriptions = await res.json();
  document.getElementById('subscriptions').innerHTML = subscriptions.map(sub => `
    <div>
      <h3>${sub.name}</h3>
      <p>Cost: $${sub.cost}</p>
      <p>Frequency: ${sub.frequency}</p>
      <p>Renewal: ${new Date(sub.renewalDate).toDateString()}</p>
      <button onclick="deleteSubscription('${sub.id}')">Delete</button>
    </div>
  `).join('');
}

async function addSubscription() {
  const name = document.getElementById('name').value;
  const cost = document.getElementById('cost').value;
  const frequency = document.getElementById('frequency').value;
  const renewalDate = document.getElementById('renewalDate').value;
  const category = document.getElementById('category').value;

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, cost, frequency, renewalDate, category })
  });
  
  if (res.ok) fetchSubscriptions();
}

async function fetchAnalytics() {
  const res = await fetch(`${apiUrl}/analytics`);
  const data = await res.json();
  document.getElementById('monthly-spending').innerText = data.monthlySpending;
  document.getElementById('category-spending').innerHTML = Object.entries(data.categorySpending)
    .map(([category, amount]) => `<p>${category}: $${amount}</p>`)
    .join('');
}

document.addEventListener('DOMContentLoaded', () => {
  fetchSubscriptions();
  fetchAnalytics();
});
