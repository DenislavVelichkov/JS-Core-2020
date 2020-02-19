class Computer {

    constructor(ramMemory, cpuGHz, hddMemory) {
        this.ramMemory = ramMemory;
        this.cpuGHz = cpuGHz;
        this.hddMemory = hddMemory;
        this.taskManager = [];
        this.installedPrograms = [];
    }

    installAProgram(name, requiredSpace) {
        if (this.hddMemory < requiredSpace) {
            throw new Error("There is not enough space on the hard drive");
        }

        let program = {
            name: name,
            requiredSpace: requiredSpace,
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

        return this.installedPrograms = this.installedPrograms.filter(p => {
            if (p === programToUninstall) {
                this.hddMemory += p.requiredSpace;
            }

            return p !== programToUninstall;
        })
    }

    openAProgram(name) {
        const ramMemoryUsage = (programRequiredSpace, totalRamMemory) => (programRequiredSpace / totalRamMemory) * 1.5;
        const cpuUsage = (programRequiredSpace, cpuGHz) => ((programRequiredSpace / cpuGHz) / 500) * 1.5;
        let openedProgram = this.installedPrograms.find(p => p.name === name);
        let isProgramAlreadyOpened = this.taskManager.find(p => p.name === name);

        if (!openedProgram) {
            throw new Error(`The ${name} is not recognized`);
        }

        if (isProgramAlreadyOpened) {
            throw new Error(`The ${name} is already open`);
        }

        let totalRamUsage = this.taskManager.reduce((acc, p) => {
            acc += ramMemoryUsage(p.requiredSpace, this.ramMemory);

            return acc;
        }, 0)

        let totalCpuUsage = this.taskManager.reduce((acc, p) => {
            acc += cpuUsage(p.requiredSpace, this.cpuGHz);

            return acc;
        }, 0)

        let currentProgram = {
            name: name,
            ramUsage: ramMemoryUsage(openedProgram.requiredSpace, this.ramMemory),
            cpuUsage: cpuUsage(openedProgram.requiredSpace, this.cpuGHz),
        }

        if (totalRamUsage >= 100.0 && totalCpuUsage >= 100.0) {
            throw new Error(`${name} caused out of memory exception`)
        }

        if (totalRamUsage >= 100.0) {
            throw new Error(`${name} caused out of memory exception`)
        }

        if (totalCpuUsage >= 100.0) {
            throw new Error(`${name} caused out of cpu exception`)
        }

        

        this.taskManager.push(currentProgram);

        return this.taskManager[this.taskManager.length - 1];
    }

    taskManagerView() {
        let outPut = "";

        if (this.taskManager.length === 0) {
            outPut += "All running smooth so far";
           
            return outPut.trim();
        }

        this.taskManager.forEach(p => {
            let ram = p.ramUsage.toFixed(0);
            let cpu = p.cpuUsage.toFixed(0);
           
            outPut += `Name - ${p.name} | Usage - CPU: ${cpu}%, RAM: ${ram}%\n`;
        })

        return outPut.trim();
    }
}


