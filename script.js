function getOne()
            {
                const outputWindow = document.getElementById("textAreaExample1");
                const form = document.getElementById('form');
                const btnClean = document.getElementById("btn_clean");
                const defaultSize = document.querySelector('#populationSize');
                const defaultGenerations = document.querySelector('#defaultGenerations');


                // Events
                form.addEventListener('submit', formSubmit);
                btnClean.addEventListener('click', formClean);
                // Events description
                function formSubmit(event) {
                    // line below - placeholder
                    outputWindow.textContent += `--- Початок виконання алгоритму! --- \n`;
                    outputWindow.textContent += "Почтакові дані для розрахунку:\n";
                    outputWindow.textContent += `Розмір популяції: ${defaultSize.value};\n`
                    outputWindow.textContent += `Кількість поколінь: ${defaultGenerations.value};\n`
                    outputWindow.textContent += "Вивід роботи алгоритму:\n";
                    outputWindow.textContent += "....\n";
                    outputWindow.textContent += "--- Кінець виконання алгоритму ---\n"
                    outputWindow.textContent += "***************************************\n"


                    event.preventDefault();
                  }
                

                function formClean(event) {
                    outputWindow.textContent = "";
                }
            }
