function copyToClipboard(text) {
    SpreadsheetApp.getUi().alert(text)
  }
  
  function createJSON() {
    var app = SpreadsheetApp;
    var ss = app.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    var range = sheet.getDataRange();
    var textFinder = range.createTextFinder('טלפון');
    var phoneCells = textFinder.findAll();
    let dataObject = phoneCells.map(
      cell => {
        let row = cell.getRow();
        let column = cell.getColumn();
        let objectToReturn = {
          description: sheet.getRange(row -1, column + 3).getValue(),
          index: sheet.getRange(row - 1, column + 4).getValue(),
          groups: []
        }
        let counter = 1
        while(!sheet.getRange(row + counter, column).isBlank()){
          let phone = sheet.getRange(row + counter, column).getValue()
          let address = sheet.getRange(row + counter, column).getValue()
          let description = sheet.getRange(row + counter, column).getValue()
          let name = sheet.getRange(row + counter, column).getValue()
          objectToReturn['groups'].push({
            phone: phone,
            address: address,
            description: description,
            name: name
          })
          counter++
        }
        return objectToReturn;
      }
    )
    console.log("Data", JSON.stringify(dataObject))
    copyToClipboard(JSON.stringify(dataObject))
  }
  
  function onOpen() {
    SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
        .createMenu('Data export')
        .addItem('Create JSON', 'createJSON')
        .addToUi();
  }
  