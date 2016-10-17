//'use strict'
const {app, BrowserWindow} = require('electron')

//require('electron-reload')(`file://${__dirname}/eltdash.html`)     //__dirname);
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog
//const R = require("r-script");

//var fs = require("fs");  
//var async = require('async');
var exec = require('child_process').exec;

//had to install npm install jquery --save


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 1024
                           , height: 900
                          // , frame: false
                         //  , webPreferences: {//nodeIntegration: false,
                        //                      preload: './manipulate.js' }
                          })

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/index.html`)
 // win.loadURL(`file://${__dirname}/index.html`)
  // Open the DevTools.
 // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
  
  return win
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
var chokidar = require('chokidar');

var watcher = chokidar.watch(`file://${__dirname}/eltdash.html`, {
  ignored: /[\/\\]\./,
  persistent: true
});

ipc.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({properties: ['openFile', 'openDirectory']}, function (files) {
   if (files){ //aqui
   var path = files[0]

//function puts(error, stdout, stderr) { console.log(stdout) }
  //  exec("Rscript reltdash.r " + path, puts);
     exec("Rscript reltdash.r " + path);
      //exec("Rscript -e 'sink('NUL')suppressMessages(rmarkdown::render('eltdash.Rmd'))sink()'" + path);
       
   //event.sender.send('selected-directory', files);       
    }
  });
watcher.on('change', path => win.loadURL(`file://${__dirname}/output.html`));    
});



/*
ipc.on('load-page', (event, arg) => {
    win.loadURL(arg);
});
*/

/*        
 var fs = require('fs')
var myNumber = undefined

function addOne(callback) {
  fs.readFile('number.txt', function doneReading(err, fileContents) {
    myNumber = parseInt(fileContents)
    myNumber++
    callback()
  })
}

function logMyNumber() {
  console.log(myNumber)
}

addOne(logMyNumber)

*/
/*
console.log(out);
 app.on('ready', () => {
  win = new BrowserWindow({width: 800, height: 600})
  win.loadURL(`file://${__dirname}/index.html`)
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('out', out)
  })
})
*/
  
  
/*  
       
    function puts(error, stdout, stderr) {event.sender.send('selected-directory', stdout); }
     exec("Rscript reltdash.r " + path, puts);
    //event.sender.send('selected-directory', ot);  

  var out = R(`file://${__dirname}/reltdash.R`)
    //R(`file://${__dirname}/reltdash.R`) 
    //.data(path)
    //.data("/Users/luisantonio/Documents/Certificacao/epSys11/elt.csv")
    .callSync()
   event.sender.send('selected-directory', out)
     }
  });
});
*/




