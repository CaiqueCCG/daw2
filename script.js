document.getElementById('fetchHolidays').addEventListener('click', function() {
    const country = document.getElementById('country').value;
    const year = document.getElementById('year').value;
    const holidaysList = document.getElementById('holidays-list');
    const errorMessage = document.getElementById('error-message');
    const apiKey = 'foaZCuyt91wvWjHR4V5KP4AuNV2X3X3q';  // Insira sua API Key da Calendarific aqui.

    // Limpar resultados anteriores
    holidaysList.innerHTML = '';
    errorMessage.innerHTML = '';

    // Verificação do ano
    if (year < 1900 || year > new Date().getFullYear() + 1) {
        errorMessage.innerHTML = 'Por favor, insira um ano válido.';
        return;
    }

    // URL da API para obter feriados do país e ano selecionados
    const url = `https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=${country}&year=${year}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const holidays = data.response.holidays;

            if (holidays.length === 0) {
                holidaysList.innerHTML = '<p>Não foram encontrados feriados para o ano e país selecionados.</p>';
            } else {
                holidays.forEach(holiday => {
                    const holidayElement = document.createElement('div');
                    holidayElement.classList.add('holiday');

                    holidayElement.innerHTML = `
                        <h3>${holiday.name}</h3>
                        <p><strong>Data:</strong> ${holiday.date.iso}</p>
                        <p><strong>Descrição:</strong> ${holiday.description || 'Sem descrição disponível.'}</p>
                        <p><strong>Tipo:</strong> ${holiday.type.join(', ')}</p>
                    `;

                    holidaysList.appendChild(holidayElement);
                });
            }
        })
        .catch(error => {
            console.error('Erro ao buscar feriados:', error);
            errorMessage.innerHTML = 'Falha ao carregar os feriados. Tente novamente mais tarde.';
        });
});
