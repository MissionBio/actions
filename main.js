// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const childProcess = require('child_process')

var demo 
var serverRunning = false
var newLineSent = false
const serverRunningText = "Network URL"

const run_on_win = () => {
  console.log('run on win')
  const run_path = path.join(__dirname, "app", "app.exe")
  //const runtime = childProcess.spawn("powershell.exe", [run_path])
  const runtime = childProcess.spawn(run_path, [], {shell: false})
  console.log('run on win pid', runtime.pid)
  return runtime
}

const run_on_posix = () => {
  console.log('run on mac')
  const runtime = childProcess.spawn(
    "/bin/bash",
    ["-c", "./app"],
    {cwd: path.join(__dirname, "app"), detached: true, env: {'LC_ALL': 'en_US.UTF-8'}}
  )
  console.log('run on mac pid', runtime.pid)
  return runtime
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadURL('data:text/html;charset=utf-8,<body>Loading</body>')
 
  if(process.platform == "win32") {
    run = run_on_win()
  } else {
    run = run_on_posix()
  }

  run.stdout.on('data', (data) => {
    console.log("on data:", data.toString())
    demo = data.toString()
    mainWindow.loadURL('data:text/html;charset=utf-8,<body>' + demo + '</body>')
  })
  
  run.stderr.on('data', (data) => {
    console.error(data.toString())
  })
  
  run.on('exit', (code) => {
    console.log(`Child exited with code ${code}`)
  })
}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
