export default function Print(values) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Printable Form</title>
      <style>
        body {
      font-family: Arial, sans-serif;
      padding : 4rem !important;
    }

    .printable-form {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      background-color: #f9f9f9;
    }

    .form-row {
      margin-bottom: 10px;
    }

    .form-row label {
      display: block;
      font-weight: bold;
    }

    .form-row input[type="text"],
    .form-row textarea {
      width: 100%;
      padding: 5px;
    }

    .form-row select {
      width: 100%;
      padding: 5px;
    }

    @media print {
      body {
        font-size: 12px;
      }

      .printable-form {
        border: none;
        background-color: transparent;
        margin: 0;
        padding: 0;
      }
    }
      </style>
    </head>
    <body>
      <div class="printable-form">
        <div class="form-row">
          <label for="vehicle-name">Vehicle Name</label>
          <input type="text" id="vehicle-name" name="vehicle-name" value="${
            values.vehicleName
          }">
        </div>
        <div class="form-row">
          <label for="reg-number">Reg Number</label>
          <input type="text" id="reg-number" name="reg-number" value="${
            values.regNum
          }">
        </div>
        <div class="form-row">
          <label for="date">Date</label>
          <input type="text" id="date" name="date" value="${values.date}">
        </div>
        <div class="form-row">
          <label for="work-details">Work Details</label>
          <textarea id="work-details" name="work-details" rows="4">${
            values.workDetails
          }</textarea>
        </div>
        <div class="form-row">
          <label for="service-provider">Service Provider</label>
          <input type="text" id="service-provider" name="service-provider" value="${
            values.serviceProvider
          }">
        </div>
        <div class="form-row">
          <label for="category">Category</label>
          <select id="category" name="category">
            <option value="maintenance" ${
              values.category === "maintenance" ? "selected" : ""
            }>Maintenance</option>
            <option value="repair" ${
              values.category === "repair" ? "selected" : ""
            }>Repair</option>
          </select>
        </div>
        <div class="form-row">
          <label for="preferred-completion-date">Preferred Completion Date</label>
          <input type="text" id="preferred-completion-date" name="preferred-completion-date" value="${
            values.preferredCompletionDate
          }">
        </div>
        <div class="form-row">
          <label for="urgency">Urgency</label>
          <input type="text" id="urgency" name="urgency" value="${
            values.urgency
          }">
        </div>
      </div>
    </body>
    </html>
  `;
}
