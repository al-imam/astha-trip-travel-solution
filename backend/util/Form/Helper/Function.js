const FormHelper = (form) => {
  return {
    SetText(query, value, font_size = 9) {
      const Surname = form.getTextField(query);
      Surname.setFontSize(font_size);
      if (!value) {
        return;
      }
      if (typeof value === "object") {
        if (value instanceof Array) {
          Surname.setText(value.join("\n"));
          console.log("helo");
        }
      } else {
        Surname.setText(value ? value.toUpperCase() : "N/A");
      }
    },
    SetRadioGroup(query, value) {
      const Group = form.getRadioGroup(query);
      Group.select(value);
    },
    SetCheck(query, value) {
      const field = form.getCheckBox(query);
      if (value) {
        field.check();
      } else {
        field.uncheck();
      }
    },
    SetBulk(List) {
      List.forEach((e) => {
        if (e.type === "PDFTextField") {
          this.SetText(e.name, e.value, e.font);
        }
        if (e.type === "PDFCheckBox") {
          this.SetCheck(e.name, e.value);
        }
        if (e.type === "PDFRadioGroup") {
          this.SetRadioGroup(e.name, e.value);
        }
      });
    },
  };
};

module.exports = FormHelper;
