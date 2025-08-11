document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("commandInput");
    const output = document.getElementById("output");
    const terminal = document.getElementById("terminal-container");
    const hint = document.getElementById("autocompleteHint");
    const mirror = document.getElementById("inputMirror");

    let commandHistory = [];
    let historyIndex = -1;

    const helpMessage = `
    <b>💻 System Commands:</b><br>
    <b>help or h</b>        - Show available commands<br>
    <b>clear or cls</b>       - Clear the terminal<br>
    <b>neofetch or fetch</b>    - Display system info (Arch Linux style)<br>
    <br>
    <b>👤 Personal Information:</b><br>
    <b>whoami</b>      - Display my identity<br>
    <b>skills</b>      - Show my technical skills<br>
    <b>projects</b>    - List my featured projects<br>
    <b>awards</b>      - Display my achievements<br>
    <b>others</b>      - Show my management/soft skills<br>
    <br>
    <b>🌐 Online Profiles:</b><br>
    <b>linkedin or ln</b>    - Open my LinkedIn profile<br>
    <b>github or gh</b>      - Open my GitHub profile<br>
    <br>
    <b>📄 Documents:</b><br>
    <b>resume or r</b>      - Download my resume<br>
    `;

    const commands = {
        help: helpMessage,
        neofetch: () => {
            let currentTime = new Date().toLocaleTimeString();
            return `<pre>
        <span class="blue">      /\\      </span>  User: kartik
        <span class="blue">     /  \\     </span>  OS: Arch Linux
        <span class="blue">    /    \\    </span>  Hostname: Kartik Raj Official server's
        <span class="blue">   /  /\\  \\   </span>  Time: ${currentTime}
        <span class="blue">  /  (--)  \\  </span>  Email: <a href="mailto:kartikreadsmail@gmail.com" class="custom-link">kartikreadsmail@gmail.com</a>
        <span class="blue"> /  /    \\  \\ </span>  GitHub: <a href="https://GitHub.com/kartikrajofficial" target="_blank" class="custom-link">GitHub.com/kartikrajofficial</a>
        <span class="blue">/___\\    /___\\</span>  LinkedIn: <a href="https://LinkedIn.com/in/kartikrajofficial" target="_blank" class="custom-link">LinkedIn.com/in/kartikrajofficial</a>
        </pre>`;
        },

        github: () => {
            window.open("https://github.com/kartikrajofficial", "_blank");
            return `Opening <a href="https://github.com/kartikrajofficial" target="_blank" class="custom-link">GitHub/kartikrajofficial</a>...`;
        },

        linkedin: () => {
            window.open("https://linkedin.com/in/kartikrajofficial", "_blank");
            return `Opening <a href="https://linkedin.com/in/kartikrajofficial" target="_blank" class="custom-link">LinkedIn/kartikrajofficial</a>...`;
        },

        projects: `
        - Backend: The Whitehats Club Website Backend <br>
        - App Integrations: Integrate Dynamic data with backend to the flutter app.<br>
        - Milan : A Fre Dating Platform
        - Telegram BOTS
        `,
        awards: `
        - have to edit txt addong soon<br>
        - 
        `,
        skills: `
        - Database: MongoDB, MySQL<br>
        - Version Control: Git<br>
        - CI/CD: Docker, GitHub CI/CD<br>
        - Cloud: Azure, AWS<br>
        - Tools: BurpSuite, Nmap, Cloudflared<br>
        - OS: Kali Linux, Arch Linux, Ubuntu, Windows
        extras:
        𝗦𝗲𝗰𝘂𝗿𝗶𝘁𝘆 𝗗𝗲𝘀𝘁𝗿𝗢𝘆𝗲𝗿(𝘽𝙐𝙂 𝙃𝙪𝙣𝙩𝙞𝙣𝙜)<br>
        🔸𝗕𝗶𝗡𝗡𝗶𝗻𝗴<br>
        🔹𝗕𝗶𝗻 𝗧𝗲𝘀𝘁𝗶𝗻𝗴<br>
        🔸𝗕𝘂𝗚 𝗛𝘂𝗻𝗧𝗶𝗻𝗴<br>
        🔹𝗖𝗥𝗔𝗖𝗞𝗜𝗡𝗚<br>
        🔸𝗣𝗵𝗶𝘀𝗶𝗻𝗴 𝗲𝘅𝗽𝗲𝗿𝘁<br>
        🔹𝗦𝗽𝗮𝗺𝗺𝗶𝗻𝗴 (𝐏𝐫𝐨𝐭𝐞𝐜𝐭𝐨𝐫)<br>
        🔸𝗖𝗮𝘀𝗵𝗼𝘂𝘁𝘀<br>
        🔸𝗕𝘆𝗽𝗮𝘀𝘀𝗶𝗻𝗴 𝟮𝗙𝗔<br>
        🔹𝗦𝗼𝗰𝗶𝗮𝗹 𝗔𝗰𝗰𝗼𝘂𝗻𝘁 𝗰𝗿𝗮𝗰𝗷𝗲𝗿<br>
        🔸𝗖𝗿𝘆𝗣𝘁𝗼 𝗧𝗥𝗔𝗗𝗜𝗡𝗚<br>
        🔹𝗙𝗶𝘃𝗲𝗿𝗿 𝗙𝗿𝗲𝗲𝗹𝗮𝗻𝗰𝗶𝗻𝗴<br>
        🔸𝗕𝘂𝗹𝗸 𝗪𝗶𝗙𝗶 𝗗𝗮𝘁𝗮𝗯𝗮𝘀𝗲<br>
        ⚠️𝗖𝗿𝗮𝗰𝗸𝗶𝗻𝗴<br>
        🔹𝗖𝗢𝗺𝗯𝗢 𝗗𝘂𝗺𝗽𝗶𝗻𝗴<br>
        🔸𝗖𝗼𝗡𝗳𝗶𝗴 𝗠𝗮𝗞𝗲𝗿<br>
        🔹𝗖𝗖 𝗖𝗵𝗲𝗰𝗸𝗲𝗿<br>
        🔸𝗔𝗽𝗽 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗺𝗲𝗻𝘁<br>
        🔹𝗦𝗸 𝗖𝗿𝗮𝗰𝗸𝗶𝗻𝗴<br>
        🔸𝗠𝗘𝗧𝗔 𝗗𝗔𝗧𝗔 <br>
        ⭐𝗠𝗮𝗻𝘆 𝗺𝗼𝗿𝗲 ...<br>
        `,
        others: `
        - Rapid learner with a strong ability to adapt to new technologies<br>
        - Strong communication and interpersonal skills<br>
        - Strong problem-solving skills<br>
        - Managed a team of 15+ developers for Technical Team<br>
        - Managed a team of 5+ developers
        `,
        whoami: `<a href="https://kartikrajofficial.github.io" class="custom-link">Kartik Raj</a> | Developer`,

        resume: () => {
            const link = document.createElement("a");
            link.href = "/resume.pdf";
            link.download = "resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return "Downloading resume...";
        },

        clear: () => resetTerminal(),
        exit: () => resetTerminal(),
    };

    const aliases = {
        gh: "github",
        ln: "linkedin",
        r: "resume",
        cls: "clear",
        h: "help",
        fetch: "neofetch"
    };

    const commandList = Object.keys(commands).concat(Object.keys(aliases));

    function processCommand(cmd) {
        cmd = cmd.toLowerCase();
        if (cmd === "") {
            output.scrollTop = output.scrollHeight;
            return;
        }

        commandHistory.push(cmd);
        historyIndex = commandHistory.length;

        if (aliases[cmd]) cmd = aliases[cmd];

        if (cmd === "clear" || cmd === "exit") {
            resetTerminal();
            return;
        }

        let response = typeof commands[cmd] === "function" ? commands[cmd]() : commands[cmd] || getClosestCommand(cmd);
        appendCommand(cmd, response);
    }

    function resetTerminal() {
        output.innerHTML = `<div class="help-message">Type 'help' to see available commands.</div>`;
        input.value = "";
        hint.textContent = "";
    }

    function appendCommand(command, result) {
        let commandLine = document.createElement("div");
        commandLine.classList.add("command-line");
        commandLine.innerHTML = `<span class="prompt">λ</span> ${command}`;
        output.appendChild(commandLine);

        let resultLine = document.createElement("div");
        resultLine.classList.add("command-result");
        resultLine.innerHTML = result;
        output.appendChild(resultLine);

        input.scrollIntoView({ behavior: "smooth" });
    }

    function getClosestCommand(inputCmd) {
        let closestMatch = commandList.find(cmd => cmd.startsWith(inputCmd));
        return closestMatch ? `Did you mean <b>${closestMatch}</b>?` : `Command not found: ${inputCmd}`;
    }

    function updateAutocompleteHint() {
        let currentInput = input.value;
        if (!currentInput) {
            hint.textContent = "";
            return;
        }
        let match = commandList.find(cmd => cmd.startsWith(currentInput));
        if (match) {
            hint.textContent = match.slice(currentInput.length);
            mirror.textContent = currentInput;
            hint.style.left = mirror.offsetWidth + "px";
        } else {
            hint.textContent = "";
        }
    }

    function autocompleteCommand() {
        let currentInput = input.value;
        if (!currentInput) return;
        let match = commandList.find(cmd => cmd.startsWith(currentInput));
        if (match) input.value = match;
        hint.textContent = "";
    }

    function createCommandBar() {
        const bar = document.getElementById("command-bar");
    
        const allCommands = Object.keys(commands);
    
        [...allCommands].sort().forEach(cmd => {
            const button = document.createElement("button");
            button.textContent = cmd;
            button.dataset.cmd = cmd;
            button.addEventListener("click", () => {
                processCommand(cmd);
            });
            bar.appendChild(button);
        });
    }

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            processCommand(input.value.trim());
            input.value = "";
            hint.textContent = "";
        } else if (event.key === "ArrowRight" || event.key === "Tab") {
            event.preventDefault();
            autocompleteCommand();
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            }
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                input.value = "";
            }
        }
    });

    input.addEventListener("input", updateAutocompleteHint);

    terminal.addEventListener("click", function () {
        input.focus();
    });

    resetTerminal();
    createCommandBar();
});
