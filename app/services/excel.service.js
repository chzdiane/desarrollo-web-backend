const ExcelJS = require('exceljs');

class ExcelService {
    constructor() {
        this.workbook = new ExcelJS.Workbook();
        this.worksheet = this.workbook.addWorksheet('Reporte_Personas');

        this.worksheet.columns = [
            { header: 'Id', key: 'id', width: 10 },
            { header: 'Nombre', key: 'name', width: 20 },
            { header: 'Email', key: 'email', width: 20 }
        ];

        this.worksheet.columns.forEach(col => {
            col.alignment = { vertical: 'middle', horizontal: 'center' };
        });

        this.worksheet.getRow(1).font = { size: 12, bold: true, color: { argb: "#D6EAF8" }};
    }

    async createWorkSheet(rows) {
        rows.forEach(row => {
            this.worksheet.addRow(row);
        });
        await this.workbook.xlsx.writeFile("public/personas.xlsx");
    }
}

module.exports = ExcelService;