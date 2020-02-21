class Computer {
    constructor(ramMemory, cpuGHz, hddMemory) {
        this.ramMemory = parseInt(ramMemory);
        this.cpuGHz = parseFloat(cpuGHz);
        this.hddMemory = parseInt(hddMemory);
        this.taskManager = [];
        this.installedPrograms = [];
        this.totalRamUsage = 0;
        this.totalCpuUsage = 0;
    }

    installAProgram(name, requiredSpace) {
        if (this.hddMemory < requiredSpace) {
            throw new Error("There is not enough space on the hard drive");
        }

        let program = {
            name,
            requiredSpace: Number(requiredSpace),
        };

        this.hddMemory -= program.requiredSpace;
        this.installedPrograms.push(program);

        return this.installedPrograms[this.installedPrograms.length - 1];
    }

    uninstallAProgram(name) {
        let programToUninstall = this.installedPrograms.find(p => p.name === name);

        if (!programToUninstall) {
            throw new Error("Control panel is not responding");
        }

        this.installedPrograms = this.installedPrograms.filter(p => {
            if (p.name === programToUninstall.name) {
                this.hddMemory += p.requiredSpace;
            }

            return p.name !== programToUninstall.name;
        })

        return this.installedPrograms;
    }

    openAProgram(name) {
        const ramMemoryUsage = (programRequiredSpace, totalRamMemory) => {
            return Number((programRequiredSpace / totalRamMemory) * 1.5);
        };
        const cpuUsage = (programRequiredSpace, cpuGHz) => {
            return Number(((programRequiredSpace / cpuGHz) / 500) * 1.5);
        };

        let programToOpen = this.installedPrograms.find(p => p.name === name);
        let isProgramAlreadyOpened = this.taskManager.find(p => p.name === name);

        if (!programToOpen) {
            throw new Error(`The ${name} is not recognized`);
        }

        if (isProgramAlreadyOpened) {
            throw new Error(`The ${name} is already open`);
        }

        let currentProgram = {
            name,
            ramUsage: ramMemoryUsage(programToOpen.requiredSpace, this.ramMemory),
            cpuUsage: cpuUsage(programToOpen.requiredSpace, this.cpuGHz),
        }

        this.totalRamUsage += currentProgram.ramUsage;
        this.totalCpuUsage += currentProgram.cpuUsage;
        

        if (this.totalRamUsage >= 100.0
            && this.totalCpuUsage >= 100.0) {
            throw new Error(`${name} caused out of memory exception`)
        }

        if (this.totalRamUsage >= 100.0) {
            throw new Error(`${name} caused out of memory exception`)
        }

        if (this.totalCpuUsage >= 100.0) {
            throw new Error(`${name} caused out of cpu exception`)
        }

        this.taskManager.push(currentProgram);

        return this.taskManager[this.taskManager.length - 1];
    }

    taskManagerView() {
        if (this.taskManager.length === 0) {
            return "All running smooth so far";
        }

        return this.taskManager.
            map(x =>
                `Name - ${x.name} | Usage - CPU: ${x.cpuUsage.toFixed(0)}%, RAM: ${x.ramUsage.toFixed(0)}%`)
            .join("\n");
    }
}

let computer = new Computer(4096, 7.5, 250000);

computer.installAProgram('Word', 7300);
computer.installAProgram('Excel', 10240);
computer.installAProgram('PowerPoint', 12288);
computer.uninstallAProgram('Word');
computer.installAProgram('Solitare', 1500);

computer.openAProgram('Excel');
computer.openAProgram('Solitare');

console.log(JSON.stringify(computer.installedPrograms, null, 2));
console.log(('-').repeat(50)) // Separator
console.log(JSON.stringify(computer.taskManager, null, 2));

computer = new Computer(4096, 7.5, 250000);

computer.installAProgram('Word', 7300);
computer.installAProgram('Excel', 10240);
computer.installAProgram('PowerPoint', 12288);
computer.installAProgram('Solitare', 1500);

computer.openAProgram('Word');
computer.openAProgram('Excel');
computer.openAProgram('PowerPoint');
computer.openAProgram('Solitare');

console.log(computer.taskManagerView());


