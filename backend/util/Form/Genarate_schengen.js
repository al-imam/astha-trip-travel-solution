
const { PDFDocument } = require('pdf-lib');
const { readFile, writeFile } = require("fs/promises");
const path = require('path')

const GenarateSchengen = async () => {

    try {
        const formUrl = await readFile(path.join(__dirname, "./src/shanghai.pdf"));
        const pdfDoc = await PDFDocument.load(formUrl)
        const form = pdfDoc.getForm();
        const nameField = form.getTextField('1 Surname (Family name)');
        const checkBox = form.getCheckBox('Two entries')
        const radio = form.getRadioGroup("28 Fingerprints collected previously for the purpose of applying for a Schengen visa");
        radio.clear()
        radio.select('No_2')
        nameField.setText('nahid');
        checkBox.check();
        // form.flatten();
        const pdfByt = await pdfDoc.save()

        await writeFile('./pdfs.pdf', pdfByt);



    } catch (error) {
        console.log("🚀 ~ file: Genarate_schengen.js:5 ~ GenarateSchengen ~ error:", error)

    }
}

module.exports = GenarateSchengen;