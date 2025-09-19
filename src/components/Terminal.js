'use client';

import { useState } from 'react';
import TextType from './TextType';
import './Terminal.css';

const Terminal = () => {
    const [history, setHistory] = useState([
        { type: "system", text: "==========================================\n| My Portfolio Terminal |\n==========================================\n" },
        { type: 'system', text: "Welcome to My Portfolio" },
        { type: 'system', text: "Type 'help' for available commands\n" },
    ]);
    const [input, setInput] = useState('');

    const commands = {
        help: "Available commands:\n- help\n- summary\n- contact\n- projects\n- experience\n- education\n- other\n- resume\n- clear",
        summary: "Results-driven Full Stack Developer with hands-on experience in front-end and back-end technologies, combined with strong expertise in AWS cloud services and modern DevOps tools, including Docker, Kubernetes, Jenkins, and Terraform. Passionate about delivering secure, high-performance solutions in fast-paced environments.",
        contact: "Email: shaiksohail0726@gmail.com\nPhone Number: +91 9392764775\nGitHub: https://github.com/sksohail19\nLinkedIn: https://linkedin.com/in/sksohail19",
        projects: "Project 1. ITFT Website (Aug 2025 - Present)\nProject 2. Role Match Job Aggregator (July 2025 - Aug 2025)\nProject 3. Ops Factory (Feb 2025 - July 2025)\nProject 4. Secure Homomorphic Lightweight Cryptographic Algorithm for Resource Constrained Devices (Jan 2024 - Apr 2024)\n\nType 'projects_<number>' to learn more about a specific project.",
        project_1: "Title: ITFT Website (Aug 2025 - Present)\nDescription: Developed a Full Stack Website using React, Node.js, and MongoDB for a student association to manage their Events, Results, and Announcements.\n\nThis website includes features such as\n - Event Management\n - Result Management\n - Announcement Management\n - User Authentication\n - Admin Panel\n - Managing Students, Staff, and Team Members\n\nTech Stack used:\n- React.js,\n- MongoDB,\n- NodeJS,\n- ExpressJS\n\nHere are the links to the website\n - https://itftsac.vercel.app",
        project_2: "Title: Role Match Job Aggregator (July 2025 - Aug 2025)\nDescription: Developed a Full Stack Website using React, Node.js, and MongoDB, where freshers and professionals can search for their new job. This website includes jobs like Remote, Onsite, Internship, Full-time, Part-time, Contract, and Freelance.\nTags: Full Stack App, React Application, Job Search, Remote Jobs, \n\nTech Stack used:\n- React.js,\n- MongoDB,\n- NodeJS,\n- ExpressJS\n\nThis website includes features such as\n - Job Search according to location, experience, and job type\n\nHere are the links to the website\n - https://role-match-pi.vercel.app",
        project_3: "Title: Ops Factory (Feb 2025 - July 2025)\nDescription: The Ops Factory is a web-based application that generates configuration files for various DevOps tools and technologies. The application provides a user-friendly interface to input parameters and generate files for different use cases.\nTags: DevOps, Configuration Files, Docker, Kubernetes, K8S, Jenkins, Terraform, Anisble, React App\n\nTech Stack used:\n - React.js\n\nHere are the links to the website\n - https://ops-factory.vercel.app",
        project_4: "Title: (SHL) Secure Homomorphic Lightweight Cryptography Algorithm for Resource Constrained Devices (Jan 2024 - Apr 2024)\nDescription: SHL is a Symmetric Cryptographic Algorithm that can be used to encrypt data before transmitting it over the internet.\nTags: Security, Lightweight, Symmetric Encryption, Cryptography\n\nTech Stack used:\n- Python\n\nHere are the links to the project\n - https://github.com/sksohail19/SHL-A-Secure-Homomorphic-Lightweight-Cryptography-Algorithm-for-Resource-Constrainted-Devices.git",
        experience: "Worked on full-stack applications using React, Node.js, and MongoDB as a freelancer and Own Projects.",
        education: "Bachelor of Technology in Information Technology (2020 - 2024)\n Kallam Haranadhareddy Institute of Technology, Guntur \n CGPA: 8.06/10\n\nHigher Secondary High School (XII) in PMC (2018 - 2020)\n NRI Junior College, Tenali\n CGPA: 8.6/10.0\n\nSecondary High School (X) in General (State Board) (2017-2018)\n Sri Chaitanya High School, Tenali\n CGPA: 9.3/10.0",
        other: "Title: Board Member for ITFT (July 2025 - Present)\n-Description: Working as a ITFT Board Member, helping the ITFT Students Team to manage their Events and Results. Given a plan for 90+ Days in various fields or domains which also includes Learning, Competition and etc...\n\nTitle: Event Coordinator (July 2023 - Apr 2024)\n -Description: Worked as a Event Coordinator in ITFT Students Association in UG. Organized 15+ events to help the students in enhancing their knowledge in various fields.\n\n",
        clear: "",
    };

    const handleCommand = (cmd) => {
        const normalized = cmd.toLowerCase();

        if (normalized === 'clear') {
            setHistory([
                { type: 'system', text: "Welcome to My Portfolio Terminal" },
                { type: 'system', text: "Type 'help' for available commands\n" },
            ]);
        } else if (normalized === 'resume') {
            // Trigger file download
            const link = document.createElement("a");
            link.href = "/Resume.pdf"; // make sure Resume.pdf is inside public/
            link.download = "Shaik_Sohail_Resume.pdf";
            link.click();

            setHistory((prev) => [
                ...prev,
                { type: 'command', text: cmd },
                { type: 'response', text: "Downloading Resume..." },
            ]);
        } else {
            const response = commands[normalized] || `Command not found: ${cmd}`;
            setHistory((prev) => [
                ...prev,
                { type: 'command', text: cmd },
                { type: 'response', text: response },
            ]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        handleCommand(input.trim());
        setInput('');
    };

    return (
        <div className="terminal">
            <div className="terminal-output">
                {history.map((entry, idx) => (
                    <div key={idx} className="terminal-entry">
                        {entry.type === 'system' && (
                            <div className="terminal-system">{entry.text}</div>
                        )}
                        {entry.type === 'command' && (
                            <div className="terminal-command">&gt; {entry.text}</div>
                        )}
                        {entry.type === 'response' && (
                            <div className="terminal-response">
                                {typeof entry.text === "string" ? (
                                    <TextType
                                        text={entry.text}
                                        typingSpeed={40}
                                        deletingSpeed={25}
                                        pauseDuration={3600}
                                        showCursor={true}
                                        hideCursorWhileTyping={false}
                                        cursorCharacter="█"
                                        textColors={["#00ff00"]}
                                        variableSpeed={{ min: 30, max: 60 }}
                                        loop={false}
                                        onSentenceComplete={() => {
                                            const cursorEl = document.querySelectorAll(".text-type__cursor");
                                            cursorEl.forEach(el => el.style.display = "none");
                                        }}
                                    />
                                ) : (
                                    entry.text
                                )}
                            </div>
                        )}
                    </div>
                ))}

                {/* Input prompt */}
                <form onSubmit={handleSubmit} className="terminal-input">
                    <span className="prompt">&gt;</span>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        autoFocus
                    />
                </form>
            </div>
        </div>
    );
};

export default Terminal;
