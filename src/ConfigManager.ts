// Manages storing configurations for this thing. Stores it at the root of the vLab thing so it doesn't get deleted when a session ends.
// lowkey making this up as i go along tbh

import { JupyterFrontEnd } from "@jupyterlab/application";

// export function getSetting(name: string) {
//     return config[name]
// }

// export function set(name: string, value: any) {
//     config[name] = value
// }

// function saveConfig() {

// }

const defaultConfig: Record<string, any> = {
    "enableAutoClose": true,
    "enableSnippets": true,
    "snippets": {

    }
}

export default class ConfigManager {
    private app: JupyterFrontEnd;
    private config: Record<string, any> = {}

    constructor(app: JupyterFrontEnd) {
        this.app = app
    }

    public getConfig = () => {
        return this.config
    }

    public get = (key: string) => {
        return this.config[key]
    }

    public fetchConfig = async () => {
        // Try to load an existing config file.
        // Create one with default config if one doesn't exist yet.
        try {
            const data = await this.app.serviceManager.contents.get("svconfig.json")
            this.config = JSON.parse(data.content)
            console.log(this.config)
        } catch (err) {
            // 
            await this.app.serviceManager.contents.save("svconfig.json", { type: "file", format: "text", content: JSON.stringify(defaultConfig, null, 2) })
            this.config = defaultConfig
        }
    }
}