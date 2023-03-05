window.onload = function() {
    const mainOptionsList = [
        {   
            name: 'palec',
            equation: (amount = 1, baseUnit = 1) => {
                return amount * 0.1 * baseUnit;
            },
        },
        {
            name: 'loket',
            equation: (amount = 1, baseUnit = 1) => {
                return amount * 0.59 * baseUnit;
            },
        },
        {
            name: 'hon',
            equation: (amount = 1, baseUnit = 1) => {
                return amount * 125 * baseUnit;
            },
        },
        {
            name: 'sud',
            equation: (amount = 1, baseUnit = 1) => {
                return amount * 244 * baseUnit;
            },
        },
        {
            name: 'číška',
            equation: (amount = 1, baseUnit = 1) => {
                return amount * 1.45 * baseUnit;
            },
        },
        {
            name: 'vědro',
            equation: (amount = 1, baseUnit = 1) => {
                return amount * 56.6 * baseUnit;
            },
        },
        {
            name: 'máz',
            equation: (amount = 1, baseUnit = 1) => {
                return amount * 1.91 * baseUnit;
            },
        },
        {
            name: 'míle',
            equation: (amount = 1, baseUnit = 1) => {
                return amount * 1610 * baseUnit;
            },
        },
        {
            name: 'feet',
            equation: (amount = 1, baseUnit = 1) => {
                return amount * 0.3048 * baseUnit;
            },
        },
        {
            name: 'yard',
            equation: (amount = 1, baseUnit = 1) => {
                return amount * 0.914 * baseUnit;
            },
        },     
    ];

    const modernOptionsLength = {
        milimetr: 1000,
        centimetr: 100,
        metr: 1,
        kilometr: 0.001,
    };

    const modernOptionsVolume = {
        mililitr: 1000,
        centilitr: 100,
        decilitr: 10,
        litr: 1,
        hektolitr: 0.01,
        centimetr_krychlový: 1000000,
        decimetr_krychlový: 1000,
        metr_krychlový: 1,
    };
    
    const numberLengthInput = document.getElementById('numberLengthInput');
    const numberVolumeInput = document.getElementById('numberVolumeInput');
    let activeLengthUnit = 'palec';
    let activeVolumeUnit = 'vědro';
    const ancientLengthInput = document.getElementById('ancientLengthInput');
    const ancientVolumeInput = document.getElementById('ancientVolumeInput');
    let userLengthInput = 1.0;
    let userVolumeInput = 1.0;
    const ancientLengthOptions = document.getElementById('ancientLengthOptions');
    const ancientVolumeOptions = document.getElementById('ancientVolumeOptions');

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    };

    const updateModernOptions = (type) => {
        const modernOptions = type == 'lengths' ? modernOptionsLength : modernOptionsVolume;
        const userInput = type == 'lengths' ? userLengthInput : userVolumeInput;
        const activeUnit = type == 'lengths' ? activeLengthUnit : activeVolumeUnit;
        const baseIndex = mainOptionsList.findIndex((x) => x.name == activeUnit);

        for (const [key, value] of Object.entries(modernOptions)) {
            const result = document.getElementById(key);
            result.innerHTML = formatNumber(mainOptionsList[baseIndex].equation(userInput, value));
        }
    };

    const onLengthInput = (event) => {
        const userInput = event.target.value;
        userLengthInput = userInput;
        updateModernOptions('lengths');
    };
    
    const onVolumeInput = (event) => {
        const userInput = event.target.value;
        userVolumeInput = userInput;
        updateModernOptions('volumes');
    };

    const ancientLengthClick = (event) => {
        const id = event.target.id;
        updateAncientLengthUnit(id);
        updateModernOptions('lengths');
        ancientLengthOptions.classList.add('hidden');
    };

    const ancientVolumeClick = (event) => {
        const id = event.target.id;
        updateAncientVolumeUnit(id);
        updateModernOptions('volumes');
        ancientVolumeOptions.classList.add('hidden');
    };

    const updateAncientLengthUnit = (newUnit) => {
        const tempActiveUnit = activeLengthUnit;
        activeLengthUnit = newUnit;
        ancientLengthInput.value = newUnit;
        const previousLi = document.getElementById(tempActiveUnit);
        const nextLi = document.getElementById(activeLengthUnit); 
        previousLi.classList.remove('hidden');
        nextLi.classList.add('hidden');
    };

    const updateAncientVolumeUnit = (newUnit) => {
        const tempActiveUnit = activeVolumeUnit;
        activeVolumeUnit = newUnit;
        ancientVolumeInput.value = newUnit;
        const previousLi = document.getElementById(tempActiveUnit);
        const nextLi = document.getElementById(activeVolumeUnit); 
        previousLi.classList.remove('hidden');
        nextLi.classList.add('hidden');
    };

    const onLengthSelectClick = () => {
        ancientLengthOptions.classList.remove('hidden');
    };

    const onVolumeSelectClick = () => {
        ancientVolumeOptions.classList.remove('hidden');
    };

    const buildOptions = (type) => {
        const activeUnit = type == 'lengths' ? activeLengthUnit : activeVolumeUnit;
        const ancientClick = type  == 'lengths' ? ancientLengthClick : ancientVolumeClick;
        const baseIndex = mainOptionsList.findIndex((x) => x.name == activeUnit);
        const object = {
            lengths: {
                modernOptions: modernOptionsLength,
                modernParent: 'optionsBox',
                ancientOptions: ['palec', 'loket', 'hon'],
                ancientParent: ancientLengthOptions,
            }, 
            volumes: {
                modernOptions: modernOptionsVolume,
                modernParent: 'optionsVolumeBox',
                ancientOptions: ['sud', 'číška', 'vědro', 'máz'],
                ancientParent: ancientVolumeOptions,
            },
        };

        // Builds initial modern options
        for (const [key, value] of Object.entries(object[type].modernOptions)) {
            const div = document.createElement('div');
            div.classList.add('content-box-row');

            const name = document.createElement('p');
            name.classList.add('content-box-number');
            name.innerHTML = key;

            const result = document.createElement('p');
            result.id = key;
            result.classList.add('content-box-row-color');
            result.innerHTML = formatNumber(mainOptionsList[baseIndex].equation(1, value));

            div.append(name, result);

            const parent = document.getElementById(object[type].modernParent);
            parent.append(div);
        }

        // Builds ancient options for select
        object[type].ancientOptions.forEach((lengthUnit) => {
            const li = document.createElement('li');
            li.id = lengthUnit;
            li.innerHTML = lengthUnit;
            li.classList.add('ancient-options');
            if (lengthUnit == activeUnit) {
                li.classList.add('hidden');
            }
            li.addEventListener('click', ancientClick, false);
            object[type].ancientParent.append(li);
        });
    };

    const optionsFactory = (showAll = false) => {
        ancientLengthInput.value = activeLengthUnit;
        ancientVolumeInput.value = activeVolumeUnit;
        buildOptions('volumes');
        buildOptions('lengths'); 
    };

    optionsFactory();

    numberLengthInput.addEventListener('input', onLengthInput, false);
    numberVolumeInput.addEventListener('input', onVolumeInput, false);
    ancientLengthInput.addEventListener('click', onLengthSelectClick, false);
    ancientVolumeInput.addEventListener('click', onVolumeSelectClick, false);
};