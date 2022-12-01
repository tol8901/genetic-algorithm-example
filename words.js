'use strict';

const minNum = 0;
const maxNum = 63;
const varCount = 3;

function getOne()
            {
                const outputWindow = document.getElementById("textAreaExample1");
                const form = document.getElementById('form');
                const btnClean = document.getElementById("btn_clean");
                const defaultSize = document.querySelector('#populationSize');
                const defaultGenerations = document.querySelector('#defaultGenerations');
                let interationCounter = 0;
                
                // Events
                form.addEventListener('submit', formSubmit);
                btnClean.addEventListener('click', formClean);
                // Events description
                function formSubmit(event) {
                    outputWindow.textContent += `--- Початок виконання алгоритму! --- \n`;
                    outputWindow.textContent += "Почтакові дані для розрахунку:\n";
                    outputWindow.textContent += `Розмір популяції: ${defaultSize.value};\n`
                    outputWindow.textContent += `Кількість поколінь: ${defaultGenerations.value};\n`
                    outputWindow.textContent += "Вивід роботи алгоритму:\n";
                    outputWindow.textContent += "....\n";

                    function random(min, max) {
                        min = Math.ceil(min);
                        max = Math.floor(max);
                        // The maximum is exclusive and the minimum is inclusive
                        return Math.floor(Math.random() * (max - min)) + min;
                    }
                    
                    function generateNumber() {
                        const number = random(minNum, maxNum);
                        return number;
                    }

                    function fintessFunction(x, y, z) {
                        const fitnessF =  4 / x + x^2 / y + y^2 / z + z^2 / 5
                        return fitnessF;
                    }
                    
                    class Member {
                        constructor(target) {
                            this.target = target;
                            this.keys = [];
                            
                            for (let i = 0; i < varCount; i += 1) {
                                this.keys[i] = generateNumber();
                            }
                            this.F = fintessFunction(this.keys[0], this.keys[1], this.keys[2]);
                        }
                    
                        fitness() {
                            return this.F;
                        }
                    
                        crossover(partner) {
                            const { length } = this.target;
                            const child = new Member(this.target);
                            const midpoint = random(0, length);
                        
                            for (let i = 0; i < length; i += 1) {
                                if (i > midpoint) {
                                    child.keys[i] = this.keys[i];
                                } else {
                                    child.keys[i] = partner.keys[i];
                                }
                            }
                        
                            return child;
                        }
                    
                        mutate(mutationRate) {
                            for (let i = 0; i < this.keys.length; i += 1) {
                                if (Math.random() < mutationRate) {
                                    this.keys[i] = generateNumber();
                                }
                            }
                        }
                    }
                    
                    class Population {
                        constructor(size, target, mutationRate) {
                            size = size || 1;
                            this.members = [];
                            this.mutationRate = mutationRate;
                            this.fitnessAllMembers = [];
                        
                            for (let i = 0; i < size; i += 1) {
                                this.members.push(new Member(target));
                            }
                            // Print population
                            outputWindow.textContent += "Популяція: \n";
                            outputWindow.textContent += "[X,Y,Z] : F \n";
                            for (let i of this.members) {
                                outputWindow.textContent += `[${i.keys}] : ${i.F} \n`;
                            }
                            for (let member of this.members) {
                                this.fitnessAllMembers.push(member.F)
                            }
                            
                        }
                    
                        evolve(generations) {
                            for (let i = 0; i < generations; i += 1) {
                                const pool = this._selectMembersForMating();
                                this._reproduce(pool);
                                interationCounter++;
                            }
                        }
                    
                        _selectMembersForMating() {
                            const matingPool = [];
                            const midpoint = this.fitnessAllMembers[this.fitnessAllMembers.length / 2]
                            this.members.forEach((m) => {
                                if (m.F >= midpoint) {
                                    matingPool.push(m);
                                }
                                
                            });

                            matingPool.forEach((matingMember) => {
                                console.log(`matingMember: ${matingMember.F}`)
                            })
                            this.fitnessAllMembers.sort(function(a, b) {
                                return a - b;
                            });
                            let mostFitPool = [];

                            return matingPool;
                        }
                    
                        _reproduce(matingPool) {
                            for (let i = 0; i < this.members.length; i += 1) {
                                // Pick 2 random members/parent from the mating pool
                                const parentA = matingPool[random(0, matingPool.length)];
                                const parentB = matingPool[random(0, matingPool.length)];
                        
                                // Perform crossover
                                const child = parentA.crossover(parentB);
                        
                                // Perform mutation
                                child.mutate(this.mutationRate);
                        
                                this.members[i] = child;
                            }
                        }
                    }
                    
                    // Init function
                    function generate(populationSize, mutationRate, generations, target=20) {
                        // Create a population and evolve for N generations
                        const population = new Population(populationSize, target, mutationRate);
                        population.evolve(generations);
                        // Termination criteria
                        if (interationCounter > defaultGenerations.value) {
                            console.log('finished')
                        }

                        // Get the typed words from all members and find if someone was able to type the target
                        const membersKeys = population.members.map((m) => m.keys.join(''));
                        const perfectCandidatesNum = membersKeys.filter((w) => w === target);
                    
                        // Print the results
                        outputWindow.textContent += (`${membersKeys}\n`);
                        outputWindow.textContent += `${perfectCandidatesNum ? perfectCandidatesNum.length : 0} member(s) typed "${target}"\n`;
                    }
                    
                    generate(defaultSize.value, 0.05, defaultGenerations.value);
                    outputWindow.textContent += "--- Кінець виконання алгоритму ---\n"
                    outputWindow.textContent += "***************************************\n"


                    event.preventDefault();
                  }
                

                function formClean(event) {
                    outputWindow.textContent = "";
                }
            }

