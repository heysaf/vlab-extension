# Saf's vLab Extension
A Quality of Life extension intended for use by those using vLab (a JupyterLab VLE) at the University of Birmingham.
> This extension was very hasily made. Do expect some bugs and report them if found.
# Features
- Auto-closing single/double quotes, parenthesis, square brackets, curly braces, etc.
- Shortcut snippets: get through boilerplate code quickly by typing in a short keyword.
- Configurable - with an `svconfig.json` file.
- Planned features:
   - Key-binding for compilation and execution.
   - Automatic code formatting with [Prettier](https://github.com/jhipster/prettier-java)
   - Session time-out: exit the session after periods of inactivity to avoid accidentally exceeding your quota.
   - Reach out if you have any suggestions!
# Installation
### 1. Downloading the `.whl` file.
Go to this repo's `Releases` and download the `.whl` file onto your machine, then upload this into your JupyterLab environment.
Alternatively, you can use `curl` to download this file into your environment directly.
### 2. Installing via `pip`.
Open a terminal window and run
```
pip install saf-vlab-extension-0.1.0.whl
```
You should get a successful installation message.
> **Note:** You'll need to run this whenever you start a new session. Installations do not persist between sessions.
### 3. Refresh the webpage.
You should then see two things:
- A "Saf's vLab extension is active!" message in the Notifications at the bottom-right of the page.
- A `svconfig.json` file appearing in the root of your notebook environment.
### 4. Tada!
Auto-closing works out of the box as soon as this is done.

The default snippets available are:
- `sout` => `System.out.println();`
- `public class ...` =>
    ```java
    public class ... {
        public static void main(String[] args) {
            
        }
    }
    ```
As you type one of these out, press `TAB` and suggestions should appear. Press enter to use the snippet.
> You can create your own snippets using the `svconfig.json` file.
# Configuration
> This is planned to become more flexible as updates are made to this extension. A graphical way of modifying these values may be made if the demand is there.
The default `svconfig.json` looks like this:
```json
{
  "enableAutoClose": true,
  "enableSnippets": true,
  "snippets": {}
}
```
- The first two are self-explanatory. Set them to `true` or `false` to toggle.
- To make a snippet, add an entry to the `snippets` object, where the key is the shortcut and the value is what this should be a shortcut for.
   - For example, this can be added to have a quick way to implement a scanner to collect user input: 
   - `{"scanner": "Scanner scanner = new Scanner(System.in);"}`
# Credits
- [Lillie](https://www.lillieverse.xyz/) - for the idea and [their work](https://www.lillieverse.xyz/mjad)