const apiKey = 'Enter your Alpha Vantage API Key';//Alpha Vantage API Key
const searchButton = document.getElementById('searchButton');
const symbolInput = document.getElementById('symbolInput');
const stockTableBody = document.querySelector('#stockTable tbody');
const companyDetailsContainer = document.getElementById('companyDetails');
const stockInfoContainer = document.getElementById('stockInfo');

searchButton.addEventListener('click', async () => {
    const symbol = symbolInput.value.trim().toUpperCase();
    if (symbol) {
        await fetchStockInfo(symbol);
        await fetchCompanyInfo(symbol);
    }
});

async function fetchCompanyInfo(symbol) {
    const companyApiUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;

    try {
        const response = await fetch(companyApiUrl);
        const companyData = await response.json();

        companyDetailsContainer.innerHTML = `
            <p><strong>Name:</strong> ${companyData.Name}</p>
            <p><strong>Description:</strong> ${companyData.Description}</p>
            <p><strong>Exchange:</strong> ${companyData.Exchange}</p>
            <!-- Add more company information fields as needed -->
        `;
    } catch (error) {
        console.error('Error fetching company data:', error);
        companyDetailsContainer.innerHTML = '<p>An error occurred while fetching company data.</p>';
    }
}

async function fetchStockInfo(symbol) {
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Clear previous data
        stockTableBody.innerHTML = '';

        for (const timestamp in data['Time Series (5min)']) {
            const entry = data['Time Series (5min)'][timestamp];

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${timestamp}</td>
                <td>${entry['1. open']}</td>
                <td>${entry['2. high']}</td>
                <td>${entry['3. low']}</td>
                <td>${entry['4. close']}</td>
                <td>${entry['5. volume']}</td>
            `;

            stockTableBody.appendChild(row);
        }

        // Display the table
        stockInfoContainer.style.display = 'block';
    } catch (error) {
        console.error('Error fetching data:', error);
        stockTableBody.innerHTML = '<tr><td colspan="6">An error occurred while fetching data.</td></tr>';
        stockInfoContainer.style.display = 'block';
    }
}
