'use client';

import { useState } from 'react';
import TextType from './TextType';
import './Terminal.css';

const Terminal = () => {
    const [history, setHistory] = useState([
        { type: 'system', text: "Welcome to My Portfolio Terminal" },
        { type: 'system', text: "Type 'help' for available commands\n" },
    ]);
    const [input, setInput] = useState('');

    const commands = {
        help: "Available commands:\n- help\n- projects\n- experience\n- education\n- clear",
        projects: "Project 1. ITFT Website (Aug 2025 - Present)\nProject 2. Role Match Job Aggregator (July 2025 - Aug 2025)\nProject 3. Ops Factory (Feb 2025 - July 2025)\nProject 4. Secure Homomorphic Lightweight Cryptographic Algorithm for Resource Constrained Devices (Jan 2024 - Apr 2024)\n\nType 'projects_<number>' to learn more about a specific project.",
        project_1: "Title: ITFT Website (AUg 2025 - Present)\nDescription: Developed a Full Stack Website using React, Node.js, and MongoDB for a student association to manager thier Events, Results, Announcements.\n\nThis website includes features such as\n - Event Management\n - Result Management\n - Announcement Management\n - User Authentication\n - Admin Panel\n - Managing Students, Staff and Team Members\n\n Here are the links to the website\n - https://itftsac.vercel.app",
        project_2: "Title: Role Match Job Aggregator (July 2025 - Aug 2025)\nDescription: Developed a Full Stack Website using React, Node.js, and MongoDB, where freshers, professionals can search for there new job. This website includes the jobs like Remote, Onsite, Internship, Full Time, Part Time, Contract, Freelance, Internship, and other jobs.\nThis Website includes the features such as \n -Job Search in according to there location, experience, and job type\n\nHere are the links to the website\n - https://role-match-pi.vercel.app",
        project_3: "",
        project_4: "",
        experience: "Worked on full-stack applications using React, Node.js, and MongoDB.",
        education: "Bachelor of Technology in Information Technology (2020 - 2024)\n Kallam Haranadhareddy Institute of Technology, Guntur \n CGPA: 8.06/10\n\nHigher Secondary High School (XII) in PMC (2018 - 2020)\n NRI Junior College, Tenali\n CGPA: 8.6/10.0\n\nSecondary High School (X) in General (State Board) (2017-2018)\n Sri Chaitanya High School, Tenali\n CGPA: 9.3/10.0",
        clear: "",
    };

    const handleCommand = (cmd) => {
        const normalized = cmd.toLowerCase();
        if (normalized === 'clear') {
            setHistory([
                { type: 'system', text: "Welcome to My Portfolio Terminal" },
                { type: 'system', text: "Type 'help' for available commands\n" },
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
                                <TextType
                                    text={entry.text}
                                    typingSpeed={40}
                                    deletingSpeed={25}
                                    pauseDuration={3600}
                                    showCursor={true}
                                    hideCursorWhileTyping={false}
                                    cursorCharacter="█"
                                    textColors={["#00ff00"]}   // keep green for terminal
                                    variableSpeed={{ min: 30, max: 60 }}
                                    loop={false}
                                    onSentenceComplete={() => {
                                        // turn off the cursor once finished
                                        const cursorEl = document.querySelectorAll(".text-type__cursor");
                                        cursorEl.forEach(el => el.style.display = "none");
                                    }}               // don't loop responses
                                />
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
