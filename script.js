function assignTask() {

  //inicia modificado 1
  //const form = document.getElementById('taskForm');
  //const inputs = form.querySelectorAll('input, textarea');
  //let isValid = true;
  //let missingFields = [];

  //inputs.forEach(input => {
  //  if (input.value.trim() === '') {
  //   isValid = false;
  //    missingFields.push(input.previousElementSibling.textContent);
  //  }
  //});

  //if (!isValid) {
  // alert('Por favor, complete los siguientes campos: ' + missingFields.join(', '));
  //  return;
  //}

  //alert('Éxito al guardar.');
  //termina modificado 1



    // Obtén los valores del formulario
    var fechaTurnos = document.getElementById("fechaTurnos").value;
    var remite = document.getElementById("remite").value;
    var claveRF = document.getElementById("claveRF").value;
    var direccion = document.getElementById("direccion").value;
    var subdireccionNo = document.getElementById("subdireccionNo").value;
    var memo = document.getElementById("memo").value;
    var area = document.getElementById("area").value;
    var firma = document.getElementById("firma").value;
    var asuntoRespuesta = document.getElementById("asuntoRespuesta").value;
    var atendio = document.getElementById("atendio").value;
    var observaciones = document.getElementById("observaciones").value;
  
    // Crea un objeto con los datos de la tarea asignada
    var taskData = {
      "Fecha Turnos": fechaTurnos,
      "Remite": remite,
      "Clave RF": claveRF,
      "Dirección": direccion,
      "Subdirección No.": subdireccionNo,
      "MEMO": memo,
      "Área": area,
      "Firma": firma,
      "Asunto: Respuesta": asuntoRespuesta,
      "Atendio": atendio,
      "Observaciones": observaciones
    };
  
    // Obtiene la lista de tareas almacenadas en el localStorage
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    // Agrega la nueva tarea a la lista
    tasks.push(taskData);
    
    // Guarda la lista actualizada en el localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  
    // Limpia el formulario después de agregar la tarea
    document.getElementById("taskForm").reset();



//  window.location.href = 'Página-2.html'; // Redirige a Pagina-2.html

  }
  
  function exportToExcel() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    if (tasks.length === 0) {
      alert("No hay tareas para exportar.");
      return;
    }
  
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(tasks);
    XLSX.utils.book_append_sheet(wb, ws, "Tareas");
  
    var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
  
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
  
    saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      "tareas.xlsx"
    );
  }
  
  function saveAs(blob, filename) {
    var elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
  
  function viewAssignedTasks() {
    window.location.href = 'prueba.html'; // Redirige a prueba.html
}

  
  function displayTasks(tasks) {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
  
    // Crea la tabla
    var table = document.createElement("table");
    table.border = "1";
  
    // Crea la fila de encabezado
    var headerRow = table.insertRow();
    for (var header in tasks[0]) {
      var headerCell = document.createElement("th");
      headerCell.textContent = header;
      headerRow.appendChild(headerCell);
    }
  
    // Agrega las filas de datos
    for (var i = 0; i < tasks.length; i++) {
      var rowData = tasks[i];
      var row = table.insertRow();
      for (var key in rowData) {
        var cell = row.insertCell();
        cell.textContent = rowData[key];
      }
    }
  
    // Agrega la tabla al contenedor
    taskList.appendChild(table);
  }
  