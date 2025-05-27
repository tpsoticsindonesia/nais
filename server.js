[
    {
        "id": "187c60b26c167aed",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Roller Arm ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"roller_arm\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1000,
        "y": 880,
        "wires": [
            [
                "419bce12e10a0dbb"
            ]
        ]
    },
    {
        "id": "136ec31f4eb0653a",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Roller Arm ALL PM 220",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"roller_arm\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1000,
        "y": 910,
        "wires": [
            [
                "419bce12e10a0dbb"
            ]
        ]
    },
    {
        "id": "33987abb1e38696a",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR2 ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_2\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 4670,
        "wires": [
            [
                "992555be16298227"
            ]
        ]
    },
    {
        "id": "29d9af8bcc37450e",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR2 ALL PM 220",
        "func": "\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_2\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 4700,
        "wires": [
            [
                "992555be16298227"
            ]
        ]
    },
    {
        "id": "702974b957ba065c",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR1 ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_1\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 4460,
        "wires": [
            [
                "a97f99ed3cb4cc56"
            ]
        ]
    },
    {
        "id": "94fbca82b1c5f543",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR1 ALL PM 220",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_1\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 4490,
        "wires": [
            [
                "a97f99ed3cb4cc56"
            ]
        ]
    },
    {
        "id": "9efd042d188a155d",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR3 ALL PM 200",
        "func": "\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_3\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 4880,
        "wires": [
            [
                "bc05b8bae92b4cb8"
            ]
        ]
    },
    {
        "id": "57a09df7e43259e4",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR3 ALL PM 220",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_3\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 4910,
        "wires": [
            [
                "bc05b8bae92b4cb8"
            ]
        ]
    },
    {
        "id": "9cb9da0ce6921a65",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR4 ALL PM 220",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_4\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 5120,
        "wires": [
            [
                "fad23c7e655e4b14"
            ]
        ]
    },
    {
        "id": "6c8a5871a23abaa5",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR4 ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_4\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 5090,
        "wires": [
            [
                "fad23c7e655e4b14"
            ]
        ]
    },
    {
        "id": "1bc3d3ea0ac17688",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR5 ALL PM 220",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_5\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 5330,
        "wires": [
            [
                "022aff77e561eaa6"
            ]
        ]
    },
    {
        "id": "66a54b79b041e09a",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR5 ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_5\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 5300,
        "wires": [
            [
                "022aff77e561eaa6"
            ]
        ]
    },
    {
        "id": "18eb09a22e2b4e22",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR6 ALL PM 220",
        "func": "\n\n\n\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_6\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 5540,
        "wires": [
            [
                "b656ab641d819758"
            ]
        ]
    },
    {
        "id": "835af2de2b7702b9",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR6 ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_6\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 5510,
        "wires": [
            [
                "b656ab641d819758"
            ]
        ]
    },
    {
        "id": "d46b0cf2a1db1331",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR7 ALL PM 200",
        "func": "\n\n\n\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_7\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 5720,
        "wires": [
            [
                "78392a252f6eaf6c"
            ]
        ]
    },
    {
        "id": "2b283d34380a65a3",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR7 ALL PM 220",
        "func": "\n\n\n\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_7\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 5750,
        "wires": [
            [
                "78392a252f6eaf6c"
            ]
        ]
    },
    {
        "id": "f174a0f42300f5c1",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR8 ALL PM 220",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_8\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 5960,
        "wires": [
            [
                "81f9f20646b4ca1c"
            ]
        ]
    },
    {
        "id": "25484155e9961b69",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR8 ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_8\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 5930,
        "wires": [
            [
                "81f9f20646b4ca1c"
            ]
        ]
    },
    {
        "id": "2bd6dfcd95fd428c",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR9 ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_9\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 6140,
        "wires": [
            [
                "d5a07250d6219f92"
            ]
        ]
    },
    {
        "id": "119f3adaa5fc5283",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR9 ALL PM 220",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_9\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 6170,
        "wires": [
            [
                "d5a07250d6219f92"
            ]
        ]
    },
    {
        "id": "fe4ce5e50f93379b",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR10 ALL PM 220",
        "func": "\n\n\n\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_10\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 6380,
        "wires": [
            [
                "83414391cd8c7ec7"
            ]
        ]
    },
    {
        "id": "a3a47eb3bff2c5af",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR10 ALL PM 200",
        "func": "\n\n\n\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_10\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 6350,
        "wires": [
            [
                "83414391cd8c7ec7"
            ]
        ]
    },
    {
        "id": "befb2191b29462f8",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR11 ALL PM 220",
        "func": "\n\n\n\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_11\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 6590,
        "wires": [
            [
                "6105490593a4aef5"
            ]
        ]
    },
    {
        "id": "896fd63599300186",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR11 ALL PM 200",
        "func": "\n\n\n\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_11\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 6560,
        "wires": [
            [
                "6105490593a4aef5"
            ]
        ]
    },
    {
        "id": "fb08bf935b3ddd73",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR12 ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_12\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 6770,
        "wires": [
            [
                "73a64b6fd42059bd"
            ]
        ]
    },
    {
        "id": "1faeb83d65fdcf26",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CR12 ALL PM 220",
        "func": "\n\n\n\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"CR_12\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 6800,
        "wires": [
            [
                "73a64b6fd42059bd"
            ]
        ]
    },
    {
        "id": "fa66587bbee0937c",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Camp Housing AB PM200V",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"DPCH\" && power_meter === \"PM-200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1750,
        "wires": [
            [
                "e0a3f977fee8a455"
            ]
        ]
    },
    {
        "id": "0295f33531e881f8",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Camp Housing AB PM220V",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift;\n\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"DPCH\" && power_meter === \"PM-220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1720,
        "wires": [
            [
                "e0a3f977fee8a455"
            ]
        ]
    },
    {
        "id": "d25f29d00aa08638",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Camp Housing CD PM200V",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"DPCH-CD\" && power_meter === \"PM-3F\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1960,
        "wires": [
            [
                "410ac8053836fab2"
            ]
        ]
    },
    {
        "id": "996e93b18dcb552e",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Camp Housing CD PM220V",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"DPCH-CD\" && power_meter === \"PM-1F\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1930,
        "wires": [
            [
                "410ac8053836fab2"
            ]
        ]
    },
    {
        "id": "ffadb7396be07f43",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "retainer_pm200",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"RET\" && power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 3740,
        "wires": [
            [
                "be10e1a38eda0b19"
            ]
        ]
    },
    {
        "id": "c18e566a1de56034",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "retainer_pm220",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"RET\" && power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 3710,
        "wires": [
            [
                "be10e1a38eda0b19"
            ]
        ]
    },
    {
        "id": "a69e772e815a0665",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Balance Shaft 1 PM200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"BS_1\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1000,
        "y": 1330,
        "wires": [
            [
                "8594c6d01f39935c"
            ]
        ]
    },
    {
        "id": "3913fa3995972588",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Balance Shaft 1 PM220",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"BS_1\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1000,
        "y": 1300,
        "wires": [
            [
                "8594c6d01f39935c"
            ]
        ]
    },
    {
        "id": "024739d0c3168173",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Balance Shaft 2 PM200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"BS_2\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1000,
        "y": 1540,
        "wires": [
            [
                "89927f25691ea8f6"
            ]
        ]
    },
    {
        "id": "c99faaf6c63c9f9a",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Balance Shaft 2 PM220",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"BS_2\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1000,
        "y": 1510,
        "wires": [
            [
                "89927f25691ea8f6"
            ]
        ]
    },
    {
        "id": "2decd83396ad4740",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Camp Housing EF PM220V",
        "func": "\n\n\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CH_EF\" && power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2770,
        "wires": [
            [
                "ae205936b5759d21"
            ]
        ]
    },
    {
        "id": "35da9dff67d7ad22",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Camp Housing EF PM200V",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CH_EF\" && power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2800,
        "wires": [
            [
                "ae205936b5759d21"
            ]
        ]
    },
    {
        "id": "81abc20309745a18",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Camp Housing SAC PM220V",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CH_SAC\" && power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2560,
        "wires": [
            [
                "f8e28481f9878d3e"
            ]
        ]
    },
    {
        "id": "a9662b91c9ab24e6",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Camp Housing SAC PM200V",
        "func": "\nvar panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CH_SAC\" && power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2590,
        "wires": [
            [
                "f8e28481f9878d3e"
            ]
        ]
    },
    {
        "id": "a3f77b5ef95a3389",
        "type": "string",
        "z": "47d2b4a4dc264f89",
        "name": "filter_energy_line_all",
        "methods": [
            {
                "name": "strip",
                "params": [
                    {
                        "type": "str",
                        "value": "\\n"
                    }
                ]
            },
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            },
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": ","
                    },
                    {
                        "type": "num",
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 420,
        "y": 510,
        "wires": [
            [
                "187c60b26c167aed",
                "136ec31f4eb0653a",
                "33987abb1e38696a",
                "29d9af8bcc37450e",
                "702974b957ba065c",
                "94fbca82b1c5f543",
                "9efd042d188a155d",
                "57a09df7e43259e4",
                "9cb9da0ce6921a65",
                "6c8a5871a23abaa5",
                "1bc3d3ea0ac17688",
                "66a54b79b041e09a",
                "18eb09a22e2b4e22",
                "835af2de2b7702b9",
                "d46b0cf2a1db1331",
                "2b283d34380a65a3",
                "f174a0f42300f5c1",
                "25484155e9961b69",
                "2bd6dfcd95fd428c",
                "119f3adaa5fc5283",
                "fe4ce5e50f93379b",
                "a3a47eb3bff2c5af",
                "befb2191b29462f8",
                "896fd63599300186",
                "fb08bf935b3ddd73",
                "1faeb83d65fdcf26",
                "fa66587bbee0937c",
                "0295f33531e881f8",
                "d25f29d00aa08638",
                "996e93b18dcb552e",
                "ffadb7396be07f43",
                "c18e566a1de56034",
                "a69e772e815a0665",
                "3913fa3995972588",
                "024739d0c3168173",
                "c99faaf6c63c9f9a",
                "2decd83396ad4740",
                "35da9dff67d7ad22",
                "81abc20309745a18",
                "a9662b91c9ab24e6",
                "8501a18dac9f71c5",
                "2269c70bc78713fd",
                "a8fd40d2023ab194",
                "ce323c354721ca61",
                "7a24e53b64326428",
                "95db8e920b13d1b9",
                "7edfeacf7992918e",
                "608d3abdf3be6895",
                "76c3b23f50480aa6",
                "21d194a8a380b95b",
                "da7a27fa8f24c18f",
                "dfb45d7ccd989c4c",
                "c3c173013da27077",
                "63e29a3eeea64dfd",
                "46c33b74ae839be9",
                "7a0d0d04abce52dc"
            ]
        ]
    },
    {
        "id": "419bce12e10a0dbb",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "0361114a2e71409f",
        "name": "",
        "x": 1260,
        "y": 880,
        "wires": [
            [
                "c52b15eb8f75769b"
            ]
        ]
    },
    {
        "id": "a97f99ed3cb4cc56",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "5c6b32f70a43ca93",
        "name": "",
        "x": 1300,
        "y": 4460,
        "wires": [
            [
                "680781a874b6081c"
            ]
        ]
    },
    {
        "id": "992555be16298227",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "407b212ddb1acfdb",
        "name": "",
        "x": 1300,
        "y": 4670,
        "wires": [
            [
                "3635bd2cbcb13798"
            ]
        ]
    },
    {
        "id": "bc05b8bae92b4cb8",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "41f68b19c3246d8a",
        "name": "",
        "x": 1300,
        "y": 4880,
        "wires": [
            [
                "9127dadc486f1a06"
            ]
        ]
    },
    {
        "id": "fad23c7e655e4b14",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "642430a0b7a904a3",
        "name": "",
        "x": 1300,
        "y": 5090,
        "wires": [
            [
                "61548b9283c83c45"
            ]
        ]
    },
    {
        "id": "022aff77e561eaa6",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "7f85a7eee76817e0",
        "name": "",
        "x": 1300,
        "y": 5300,
        "wires": [
            [
                "582045a32ce98599"
            ]
        ]
    },
    {
        "id": "b656ab641d819758",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "e9b109274bd299cd",
        "name": "",
        "x": 1300,
        "y": 5510,
        "wires": [
            [
                "fbd539a8b77922b1"
            ]
        ]
    },
    {
        "id": "78392a252f6eaf6c",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "61c7b5303d27909b",
        "name": "",
        "x": 1300,
        "y": 5720,
        "wires": [
            [
                "da4856145b0eae17"
            ]
        ]
    },
    {
        "id": "83414391cd8c7ec7",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "956813c6441ba02d",
        "name": "",
        "x": 1290,
        "y": 6350,
        "wires": [
            [
                "b69e0dbdb33baf28"
            ]
        ]
    },
    {
        "id": "81f9f20646b4ca1c",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "8e1abcde75d29c6e",
        "name": "",
        "x": 1300,
        "y": 5930,
        "wires": [
            [
                "816285e7de21c525"
            ]
        ]
    },
    {
        "id": "d5a07250d6219f92",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "cb5678987898cbfe",
        "name": "",
        "x": 1300,
        "y": 6140,
        "wires": [
            [
                "86d3b08eed0db95c"
            ]
        ]
    },
    {
        "id": "6105490593a4aef5",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "5d16b75c2c713543",
        "name": "",
        "x": 1290,
        "y": 6560,
        "wires": [
            [
                "01d5c1328e1ba608"
            ]
        ]
    },
    {
        "id": "73a64b6fd42059bd",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "a6d6def47310eb39",
        "name": "",
        "x": 1290,
        "y": 6770,
        "wires": [
            [
                "41071d8c1e411745"
            ]
        ]
    },
    {
        "id": "8594c6d01f39935c",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "6d1653ba238d6863",
        "name": "",
        "x": 1280,
        "y": 1300,
        "wires": [
            [
                "231449ee6efef0ba"
            ]
        ]
    },
    {
        "id": "89927f25691ea8f6",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "6b4525fbd18bd30e",
        "name": "",
        "x": 1280,
        "y": 1510,
        "wires": [
            [
                "e6fd717ae60f7010"
            ]
        ]
    },
    {
        "id": "e0a3f977fee8a455",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "77b10ec0f7b97c95",
        "name": "",
        "x": 1280,
        "y": 1720,
        "wires": [
            [
                "7a116996576df786"
            ]
        ]
    },
    {
        "id": "410ac8053836fab2",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "80575a721b4e8402",
        "name": "",
        "x": 1280,
        "y": 1930,
        "wires": [
            [
                "ebe58da88c2b2c2c"
            ]
        ]
    },
    {
        "id": "be10e1a38eda0b19",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "5ece4c8e9f4698c2",
        "name": "",
        "x": 1290,
        "y": 3710,
        "wires": [
            [
                "979f2efd3ac680f5"
            ]
        ]
    },
    {
        "id": "ae205936b5759d21",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "3a0fa0589f998305",
        "name": "",
        "x": 1280,
        "y": 2770,
        "wires": [
            [
                "b2b35be175619390"
            ]
        ]
    },
    {
        "id": "f8e28481f9878d3e",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "26965381d907279f",
        "name": "",
        "x": 1280,
        "y": 2560,
        "wires": [
            [
                "a44e37bb157701c1"
            ]
        ]
    },
    {
        "id": "8501a18dac9f71c5",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "LPF3 PM 220",
        "func": "\n\n\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"lp_f3\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1070,
        "y": 4130,
        "wires": [
            [
                "d25fac65c229b592"
            ]
        ]
    },
    {
        "id": "d25fac65c229b592",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "18e94f3dd27470fb",
        "name": "",
        "x": 1300,
        "y": 4130,
        "wires": [
            [
                "acbfe82d17c61c03"
            ]
        ]
    },
    {
        "id": "2269c70bc78713fd",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "KUB KWH TOTAL",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_kubikal (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1020,
        "y": 530,
        "wires": [
            [
                "884fb7d74803fb6e"
            ]
        ]
    },
    {
        "id": "884fb7d74803fb6e",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "66bbdf3188c2f96b",
        "name": "",
        "x": 1300,
        "y": 500,
        "wires": [
            [
                "4b74d8e5a1512cff"
            ]
        ]
    },
    {
        "id": "acbfe82d17c61c03",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1520,
        "y": 4130,
        "wires": [
            [
                "fcced25e7e10eb6f"
            ]
        ]
    },
    {
        "id": "ca9a80d31927fce4",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 500,
        "wires": [
            [
                "710505f596b6fb2d"
            ]
        ]
    },
    {
        "id": "9f77c5fafb6a588c",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 530,
        "wires": [
            [
                "710505f596b6fb2d"
            ]
        ]
    },
    {
        "id": "bcf366b6b1cb461a",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "18e94f3dd27470fb",
        "name": "",
        "x": 1940,
        "y": 4130,
        "wires": [
            []
        ]
    },
    {
        "id": "fcced25e7e10eb6f",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift LPF3 PM 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1720,
        "y": 4130,
        "wires": [
            [
                "bcf366b6b1cb461a"
            ]
        ]
    },
    {
        "id": "bded6793a80cbe40",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "66bbdf3188c2f96b",
        "name": "",
        "x": 1880,
        "y": 500,
        "wires": [
            []
        ]
    },
    {
        "id": "4b74d8e5a1512cff",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift PM KUB",
        "func": "if (msg.payload && Array.isArray(msg.payload) && msg.payload.length > 0) {\n    var payload = msg.payload[0]; // Mengambil elemen pertama dari array payload\n\n    if (!payload.date_time) {\n        node.warn(\"date_time is missing in payload: \" + JSON.stringify(payload));\n        return null; // Stop execution if date_time is missing\n    }\n\n    var date_time = new Date(payload.date_time);\n    var power_meter = payload.power_meter;\n    var value = payload.value;\n    var shift;\n\n    var currentHour = date_time.getHours();\n    var currentMinute = date_time.getMinutes();\n    var currentDay = date_time.getDate();\n    var currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7);\n    var currentMonth = date_time.toLocaleString('default', { month: 'long' });\n    var currentYear = date_time.getFullYear();\n\n    if (power_meter === \"DA_01\") {\n        if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n            (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n            shift = \"shift_1\";\n        } else {\n            shift = \"shift_2\";\n        }\n\n        msg.topic = \"INSERT INTO tb_pershift_kub (power_meter, value, shift, day, week, month, year) \" +\n            \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n            \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n        return msg;\n    }\n} else {\n    // node.warn(\"msg.payload is not an array or is empty\");\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1550,
        "y": 500,
        "wires": [
            [
                "bded6793a80cbe40"
            ]
        ]
    },
    {
        "id": "680781a874b6081c",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "if (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1510,
        "y": 4460,
        "wires": [
            [
                "37a5df3f5dea61f6",
                "543a493427767767"
            ]
        ]
    },
    {
        "id": "3635bd2cbcb13798",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1510,
        "y": 4670,
        "wires": [
            [
                "90f41c7edc0fc7f6",
                "1eb8254ab5c4b209"
            ]
        ]
    },
    {
        "id": "9127dadc486f1a06",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1510,
        "y": 4880,
        "wires": [
            [
                "4f8a555e4e2092b2",
                "07ab52eccadf6ff6"
            ]
        ]
    },
    {
        "id": "543a493427767767",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR1 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 4490,
        "wires": [
            [
                "b455c7068468f601"
            ]
        ]
    },
    {
        "id": "37a5df3f5dea61f6",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR1 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 4460,
        "wires": [
            [
                "b455c7068468f601"
            ]
        ]
    },
    {
        "id": "b455c7068468f601",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "5c6b32f70a43ca93",
        "name": "",
        "x": 1920,
        "y": 4460,
        "wires": [
            []
        ]
    },
    {
        "id": "35bf5ca3a8a768ba",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "407b212ddb1acfdb",
        "name": "",
        "x": 1920,
        "y": 4670,
        "wires": [
            []
        ]
    },
    {
        "id": "e081a041b20318ae",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "41f68b19c3246d8a",
        "name": "",
        "x": 1920,
        "y": 4880,
        "wires": [
            []
        ]
    },
    {
        "id": "1eb8254ab5c4b209",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR2 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 4700,
        "wires": [
            [
                "35bf5ca3a8a768ba"
            ]
        ]
    },
    {
        "id": "90f41c7edc0fc7f6",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR2 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 4670,
        "wires": [
            [
                "35bf5ca3a8a768ba"
            ]
        ]
    },
    {
        "id": "07ab52eccadf6ff6",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR3 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 4910,
        "wires": [
            [
                "e081a041b20318ae"
            ]
        ]
    },
    {
        "id": "4f8a555e4e2092b2",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR3 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 4880,
        "wires": [
            [
                "e081a041b20318ae"
            ]
        ]
    },
    {
        "id": "61548b9283c83c45",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1510,
        "y": 5090,
        "wires": [
            [
                "8a2af515ae0f5ee3",
                "36f86f23d814cf39"
            ]
        ]
    },
    {
        "id": "582045a32ce98599",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1510,
        "y": 5300,
        "wires": [
            [
                "02f4db74c93fd963",
                "e01a50bf00314257"
            ]
        ]
    },
    {
        "id": "fbd539a8b77922b1",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1510,
        "y": 5510,
        "wires": [
            [
                "7b3540f576d25907",
                "d67d2d139eaeda65"
            ]
        ]
    },
    {
        "id": "36f86f23d814cf39",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR4 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 5120,
        "wires": [
            [
                "437ec34c249f2d78"
            ]
        ]
    },
    {
        "id": "8a2af515ae0f5ee3",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR4 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 5090,
        "wires": [
            [
                "437ec34c249f2d78"
            ]
        ]
    },
    {
        "id": "437ec34c249f2d78",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "642430a0b7a904a3",
        "name": "",
        "x": 1920,
        "y": 5090,
        "wires": [
            []
        ]
    },
    {
        "id": "f6524c6f85885a4c",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "7f85a7eee76817e0",
        "name": "",
        "x": 1920,
        "y": 5300,
        "wires": [
            []
        ]
    },
    {
        "id": "fe0ed4a9e92b8ad7",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "e9b109274bd299cd",
        "name": "",
        "x": 1920,
        "y": 5510,
        "wires": [
            []
        ]
    },
    {
        "id": "e01a50bf00314257",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR5 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 5330,
        "wires": [
            [
                "f6524c6f85885a4c"
            ]
        ]
    },
    {
        "id": "02f4db74c93fd963",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR5 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 5300,
        "wires": [
            [
                "f6524c6f85885a4c"
            ]
        ]
    },
    {
        "id": "d67d2d139eaeda65",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR6 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 5540,
        "wires": [
            [
                "fe0ed4a9e92b8ad7"
            ]
        ]
    },
    {
        "id": "7b3540f576d25907",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR6 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 5510,
        "wires": [
            [
                "fe0ed4a9e92b8ad7"
            ]
        ]
    },
    {
        "id": "da4856145b0eae17",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1510,
        "y": 5720,
        "wires": [
            [
                "627284bd7d816352",
                "d01a606c0fce7e65"
            ]
        ]
    },
    {
        "id": "816285e7de21c525",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1510,
        "y": 5930,
        "wires": [
            [
                "ad172c324e90f33a",
                "a204a10514be09ce"
            ]
        ]
    },
    {
        "id": "86d3b08eed0db95c",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1510,
        "y": 6140,
        "wires": [
            [
                "2e744d8c4e395811",
                "4fcf83ea17cadc9a"
            ]
        ]
    },
    {
        "id": "d01a606c0fce7e65",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR7 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 5750,
        "wires": [
            [
                "6a5959124a4c8264"
            ]
        ]
    },
    {
        "id": "627284bd7d816352",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR7 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 5720,
        "wires": [
            [
                "6a5959124a4c8264"
            ]
        ]
    },
    {
        "id": "6a5959124a4c8264",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "61c7b5303d27909b",
        "name": "",
        "x": 1920,
        "y": 5720,
        "wires": [
            []
        ]
    },
    {
        "id": "d10d5ff4995989d0",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "8e1abcde75d29c6e",
        "name": "",
        "x": 1920,
        "y": 5930,
        "wires": [
            []
        ]
    },
    {
        "id": "3ca52b01aadc3c5c",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "cb5678987898cbfe",
        "name": "",
        "x": 1920,
        "y": 6140,
        "wires": [
            []
        ]
    },
    {
        "id": "a204a10514be09ce",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR8 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 5960,
        "wires": [
            [
                "d10d5ff4995989d0"
            ]
        ]
    },
    {
        "id": "ad172c324e90f33a",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR8 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 5930,
        "wires": [
            [
                "d10d5ff4995989d0"
            ]
        ]
    },
    {
        "id": "4fcf83ea17cadc9a",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR9 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 6170,
        "wires": [
            [
                "3ca52b01aadc3c5c"
            ]
        ]
    },
    {
        "id": "2e744d8c4e395811",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR9 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 6140,
        "wires": [
            [
                "3ca52b01aadc3c5c"
            ]
        ]
    },
    {
        "id": "b69e0dbdb33baf28",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1510,
        "y": 6350,
        "wires": [
            [
                "e05da67b5f210671",
                "412a14ec8fd44ab1"
            ]
        ]
    },
    {
        "id": "01d5c1328e1ba608",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1510,
        "y": 6560,
        "wires": [
            [
                "23c9735b7ac275dc",
                "f25b5fd756aa7810"
            ]
        ]
    },
    {
        "id": "41071d8c1e411745",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1510,
        "y": 6770,
        "wires": [
            [
                "46566988e43eb947",
                "a44c01c859e856a5"
            ]
        ]
    },
    {
        "id": "412a14ec8fd44ab1",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR10 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 6380,
        "wires": [
            [
                "b7a7d8dafcc26b1b"
            ]
        ]
    },
    {
        "id": "e05da67b5f210671",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR10 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 6350,
        "wires": [
            [
                "b7a7d8dafcc26b1b"
            ]
        ]
    },
    {
        "id": "b7a7d8dafcc26b1b",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "956813c6441ba02d",
        "name": "",
        "x": 1930,
        "y": 6350,
        "wires": [
            []
        ]
    },
    {
        "id": "d42a41584d2e7be2",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "5d16b75c2c713543",
        "name": "",
        "x": 1930,
        "y": 6560,
        "wires": [
            []
        ]
    },
    {
        "id": "5029eb417d15a118",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "a6d6def47310eb39",
        "name": "",
        "x": 1930,
        "y": 6770,
        "wires": [
            []
        ]
    },
    {
        "id": "f25b5fd756aa7810",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR11 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 6590,
        "wires": [
            [
                "d42a41584d2e7be2"
            ]
        ]
    },
    {
        "id": "23c9735b7ac275dc",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR11 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 6560,
        "wires": [
            [
                "d42a41584d2e7be2"
            ]
        ]
    },
    {
        "id": "a44c01c859e856a5",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR12 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 6800,
        "wires": [
            [
                "5029eb417d15a118"
            ]
        ]
    },
    {
        "id": "46566988e43eb947",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CR12 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 6770,
        "wires": [
            [
                "5029eb417d15a118"
            ]
        ]
    },
    {
        "id": "c52b15eb8f75769b",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1450,
        "y": 880,
        "wires": [
            [
                "eb1d97e4ee0650ab",
                "5ea02c6cb1453888"
            ]
        ]
    },
    {
        "id": "5ea02c6cb1453888",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift Roller Arm 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1660,
        "y": 910,
        "wires": [
            [
                "78eb0a9959a5b12f"
            ]
        ]
    },
    {
        "id": "eb1d97e4ee0650ab",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift  Roller Arm 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1660,
        "y": 880,
        "wires": [
            [
                "78eb0a9959a5b12f"
            ]
        ]
    },
    {
        "id": "78eb0a9959a5b12f",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "0361114a2e71409f",
        "name": "",
        "x": 1890,
        "y": 880,
        "wires": [
            []
        ]
    },
    {
        "id": "231449ee6efef0ba",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1490,
        "y": 1300,
        "wires": [
            [
                "a8e8d966c1839753",
                "01fdf9b10667ea19"
            ]
        ]
    },
    {
        "id": "01fdf9b10667ea19",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift BS2 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1680,
        "y": 1330,
        "wires": [
            [
                "3faedeb97032897f"
            ]
        ]
    },
    {
        "id": "a8e8d966c1839753",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift BS2 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1680,
        "y": 1300,
        "wires": [
            [
                "3faedeb97032897f"
            ]
        ]
    },
    {
        "id": "e6fd717ae60f7010",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1490,
        "y": 1510,
        "wires": [
            [
                "a2bfa97f55b79c34",
                "23f6053244e2062f"
            ]
        ]
    },
    {
        "id": "23f6053244e2062f",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift BS1 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1680,
        "y": 1540,
        "wires": [
            [
                "bc0523857171ee1a"
            ]
        ]
    },
    {
        "id": "a2bfa97f55b79c34",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift BS1 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1680,
        "y": 1510,
        "wires": [
            [
                "bc0523857171ee1a"
            ]
        ]
    },
    {
        "id": "7a116996576df786",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1500,
        "y": 1720,
        "wires": [
            [
                "03f10673fc6b1066",
                "664f3ec7922fe6b4"
            ]
        ]
    },
    {
        "id": "664f3ec7922fe6b4",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CHAB 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM-220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1690,
        "y": 1750,
        "wires": [
            [
                "0d6c81161f195e5e"
            ]
        ]
    },
    {
        "id": "03f10673fc6b1066",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CHAB 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM-200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1690,
        "y": 1720,
        "wires": [
            [
                "0d6c81161f195e5e"
            ]
        ]
    },
    {
        "id": "ebe58da88c2b2c2c",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1500,
        "y": 1930,
        "wires": [
            [
                "6b77635983f9a8ae",
                "2b043635870c5e96"
            ]
        ]
    },
    {
        "id": "2b043635870c5e96",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CHCD 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM-1F\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1690,
        "y": 1960,
        "wires": [
            [
                "2aa621e24f19d794"
            ]
        ]
    },
    {
        "id": "6b77635983f9a8ae",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CHCD 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM-3F\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1690,
        "y": 1930,
        "wires": [
            [
                "2aa621e24f19d794"
            ]
        ]
    },
    {
        "id": "a44e37bb157701c1",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1500,
        "y": 2560,
        "wires": [
            [
                "99529b0ad340f161",
                "8a004010ed7d11ad"
            ]
        ]
    },
    {
        "id": "8a004010ed7d11ad",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CHSAC 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 2590,
        "wires": [
            [
                "01b9e61b717f4094"
            ]
        ]
    },
    {
        "id": "99529b0ad340f161",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CHSAC 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1700,
        "y": 2560,
        "wires": [
            [
                "01b9e61b717f4094"
            ]
        ]
    },
    {
        "id": "b2b35be175619390",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1500,
        "y": 2770,
        "wires": [
            [
                "08fe4bfbb16728e9",
                "3f22e3486f1eacf2"
            ]
        ]
    },
    {
        "id": "3f22e3486f1eacf2",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CHEF 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1690,
        "y": 2800,
        "wires": [
            [
                "9631d841612434a5"
            ]
        ]
    },
    {
        "id": "08fe4bfbb16728e9",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CHEF 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1690,
        "y": 2770,
        "wires": [
            [
                "9631d841612434a5"
            ]
        ]
    },
    {
        "id": "979f2efd3ac680f5",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1540,
        "y": 3710,
        "wires": [
            [
                "209f9e3621ebaeb5",
                "3a74e2267ed24809"
            ]
        ]
    },
    {
        "id": "3a74e2267ed24809",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift RET 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1730,
        "y": 3740,
        "wires": [
            [
                "0db23523492e64ee"
            ]
        ]
    },
    {
        "id": "209f9e3621ebaeb5",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift RET 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1730,
        "y": 3710,
        "wires": [
            [
                "0db23523492e64ee"
            ]
        ]
    },
    {
        "id": "0db23523492e64ee",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "5ece4c8e9f4698c2",
        "name": "",
        "x": 1930,
        "y": 3710,
        "wires": [
            []
        ]
    },
    {
        "id": "9631d841612434a5",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "3a0fa0589f998305",
        "name": "",
        "x": 1920,
        "y": 2770,
        "wires": [
            []
        ]
    },
    {
        "id": "01b9e61b717f4094",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "26965381d907279f",
        "name": "",
        "x": 1940,
        "y": 2560,
        "wires": [
            []
        ]
    },
    {
        "id": "2aa621e24f19d794",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "80575a721b4e8402",
        "name": "",
        "x": 1920,
        "y": 1930,
        "wires": [
            []
        ]
    },
    {
        "id": "0d6c81161f195e5e",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "77b10ec0f7b97c95",
        "name": "",
        "x": 1920,
        "y": 1720,
        "wires": [
            []
        ]
    },
    {
        "id": "bc0523857171ee1a",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "6b4525fbd18bd30e",
        "name": "",
        "x": 1910,
        "y": 1510,
        "wires": [
            []
        ]
    },
    {
        "id": "3faedeb97032897f",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "6d1653ba238d6863",
        "name": "",
        "x": 1910,
        "y": 1300,
        "wires": [
            []
        ]
    },
    {
        "id": "a8fd40d2023ab194",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Panel Energy_QG_CT",
        "func": "var array = msg.payload;\n\nif (array[0] === \"DP_QG_CT\") {\n    var sql = `INSERT INTO tb_panel_qg_ct (panel, code_power_meter, power_watt, energy_wh, current_a, voltage_v) \n                VALUES ('${array[0]}', '${array[1]}', '${array[2]}', '${array[3]}', '${array[4]}', '${array[5]}')`;\n\n    msg.topic = sql;\n    return msg;\n}else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1050,
        "y": 7110,
        "wires": [
            [
                "ee48c4a338b66f66"
            ]
        ]
    },
    {
        "id": "ee48c4a338b66f66",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "dac028631c98c7b8",
        "name": "",
        "x": 1280,
        "y": 7110,
        "wires": [
            [
                "a881cb8b55b13b59"
            ]
        ]
    },
    {
        "id": "04ebd4d41505b9bd",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift_kub",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\n\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n// Memastikan format SQL yang benar\nmsg.topic = `UPDATE tb_pershift_kub SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1600,
        "y": 540,
        "wires": [
            [
                "bded6793a80cbe40"
            ]
        ]
    },
    {
        "id": "0953596f7162ac8f",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 560,
        "wires": [
            [
                "4a5840bb00a976d7"
            ]
        ]
    },
    {
        "id": "249c4fa3b23cf055",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 590,
        "wires": [
            [
                "4a5840bb00a976d7"
            ]
        ]
    },
    {
        "id": "8deda76cc8ec3a9f",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "66bbdf3188c2f96b",
        "name": "",
        "x": 1300,
        "y": 540,
        "wires": [
            [
                "04ebd4d41505b9bd"
            ]
        ]
    },
    {
        "id": "cf9d589928d884ba",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "18e94f3dd27470fb",
        "name": "",
        "x": 1300,
        "y": 4170,
        "wires": [
            [
                "0d4581605ae71235"
            ]
        ]
    },
    {
        "id": "0d4581605ae71235",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift pm220",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\n\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n// Memastikan format SQL yang benar\nmsg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1670,
        "y": 4170,
        "wires": [
            [
                "bcf366b6b1cb461a"
            ]
        ]
    },
    {
        "id": "b8d40d0dce961f1e",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "5c6b32f70a43ca93",
        "name": "",
        "x": 1300,
        "y": 4500,
        "wires": [
            [
                "e9c3ce4de5224887"
            ]
        ]
    },
    {
        "id": "a519431b6c88de21",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "407b212ddb1acfdb",
        "name": "",
        "x": 1300,
        "y": 4710,
        "wires": [
            [
                "de73920f8247dbbe"
            ]
        ]
    },
    {
        "id": "821ddbbaaf3d5da9",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "41f68b19c3246d8a",
        "name": "",
        "x": 1300,
        "y": 4920,
        "wires": [
            [
                "8f19622bb12e4199"
            ]
        ]
    },
    {
        "id": "ece37a70275e23c6",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "642430a0b7a904a3",
        "name": "",
        "x": 1300,
        "y": 5130,
        "wires": [
            [
                "32dfe79fbc34ec27"
            ]
        ]
    },
    {
        "id": "76d2734168bd48f6",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "7f85a7eee76817e0",
        "name": "",
        "x": 1300,
        "y": 5340,
        "wires": [
            [
                "a9a2d2ae45202d67"
            ]
        ]
    },
    {
        "id": "e35fe574aeba550d",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "e9b109274bd299cd",
        "name": "",
        "x": 1300,
        "y": 5550,
        "wires": [
            [
                "5d665e211dc0b276"
            ]
        ]
    },
    {
        "id": "1f96f2cb143c41ac",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "61c7b5303d27909b",
        "name": "",
        "x": 1300,
        "y": 5760,
        "wires": [
            [
                "e4a711c2e937733c"
            ]
        ]
    },
    {
        "id": "68fecb4c5743fff3",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "8e1abcde75d29c6e",
        "name": "",
        "x": 1300,
        "y": 5970,
        "wires": [
            [
                "6394c41b75965b98"
            ]
        ]
    },
    {
        "id": "230f57d45207a4a4",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "cb5678987898cbfe",
        "name": "",
        "x": 1300,
        "y": 6180,
        "wires": [
            [
                "73a5921ebd00557c"
            ]
        ]
    },
    {
        "id": "372488a6b97bfb8f",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "956813c6441ba02d",
        "name": "",
        "x": 1290,
        "y": 6390,
        "wires": [
            [
                "09a1b3212d08a193"
            ]
        ]
    },
    {
        "id": "37cbd8da14948cda",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "5d16b75c2c713543",
        "name": "",
        "x": 1290,
        "y": 6600,
        "wires": [
            [
                "f1541336e66b78c2"
            ]
        ]
    },
    {
        "id": "e7eef7f498546203",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "a6d6def47310eb39",
        "name": "",
        "x": 1290,
        "y": 6810,
        "wires": [
            [
                "a87f83417b1e01e6"
            ]
        ]
    },
    {
        "id": "7a960b93f83cdb95",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "0361114a2e71409f",
        "name": "",
        "x": 1260,
        "y": 920,
        "wires": [
            [
                "865a2c5ec4db2bf2"
            ]
        ]
    },
    {
        "id": "5e4fb3d1303123fa",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "6d1653ba238d6863",
        "name": "",
        "x": 1280,
        "y": 1340,
        "wires": [
            [
                "dee0ccfa6f2696ea"
            ]
        ]
    },
    {
        "id": "8601cfc19ec8bc9f",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "6b4525fbd18bd30e",
        "name": "",
        "x": 1280,
        "y": 1550,
        "wires": [
            [
                "c6136e3d387673a3"
            ]
        ]
    },
    {
        "id": "202b03d4e972864e",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "77b10ec0f7b97c95",
        "name": "",
        "x": 1280,
        "y": 1760,
        "wires": [
            [
                "a489537dda6514a0"
            ]
        ]
    },
    {
        "id": "063f268c2ec8dbf6",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "80575a721b4e8402",
        "name": "",
        "x": 1280,
        "y": 1970,
        "wires": [
            [
                "c7c50427e1760c84"
            ]
        ]
    },
    {
        "id": "72c27f31de4efdbc",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "26965381d907279f",
        "name": "",
        "x": 1280,
        "y": 2600,
        "wires": [
            [
                "8b6443839784dd69"
            ]
        ]
    },
    {
        "id": "becf6a0eb24983df",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "3a0fa0589f998305",
        "name": "",
        "x": 1280,
        "y": 2810,
        "wires": [
            [
                "2cde0be905cd26fa"
            ]
        ]
    },
    {
        "id": "50159503ec62afbe",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "5ece4c8e9f4698c2",
        "name": "",
        "x": 1290,
        "y": 3750,
        "wires": [
            [
                "91f6774526381a73"
            ]
        ]
    },
    {
        "id": "e9c3ce4de5224887",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1660,
        "y": 4520,
        "wires": [
            [
                "b455c7068468f601"
            ]
        ]
    },
    {
        "id": "de73920f8247dbbe",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1660,
        "y": 4730,
        "wires": [
            [
                "35bf5ca3a8a768ba"
            ]
        ]
    },
    {
        "id": "8f19622bb12e4199",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1660,
        "y": 4940,
        "wires": [
            [
                "e081a041b20318ae"
            ]
        ]
    },
    {
        "id": "32dfe79fbc34ec27",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1660,
        "y": 5150,
        "wires": [
            [
                "437ec34c249f2d78"
            ]
        ]
    },
    {
        "id": "a9a2d2ae45202d67",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1660,
        "y": 5360,
        "wires": [
            [
                "f6524c6f85885a4c"
            ]
        ]
    },
    {
        "id": "5d665e211dc0b276",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1660,
        "y": 5570,
        "wires": [
            [
                "fe0ed4a9e92b8ad7"
            ]
        ]
    },
    {
        "id": "e4a711c2e937733c",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1660,
        "y": 5780,
        "wires": [
            [
                "6a5959124a4c8264"
            ]
        ]
    },
    {
        "id": "6394c41b75965b98",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1660,
        "y": 5990,
        "wires": [
            [
                "d10d5ff4995989d0"
            ]
        ]
    },
    {
        "id": "73a5921ebd00557c",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1660,
        "y": 6200,
        "wires": [
            [
                "3ca52b01aadc3c5c"
            ]
        ]
    },
    {
        "id": "09a1b3212d08a193",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1660,
        "y": 6410,
        "wires": [
            [
                "b7a7d8dafcc26b1b"
            ]
        ]
    },
    {
        "id": "f1541336e66b78c2",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1660,
        "y": 6620,
        "wires": [
            [
                "d42a41584d2e7be2"
            ]
        ]
    },
    {
        "id": "a87f83417b1e01e6",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1660,
        "y": 6830,
        "wires": [
            [
                "5029eb417d15a118"
            ]
        ]
    },
    {
        "id": "865a2c5ec4db2bf2",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1640,
        "y": 940,
        "wires": [
            [
                "78eb0a9959a5b12f"
            ]
        ]
    },
    {
        "id": "91f6774526381a73",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM_220V\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM_200V\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1690,
        "y": 3770,
        "wires": [
            [
                "0db23523492e64ee"
            ]
        ]
    },
    {
        "id": "dee0ccfa6f2696ea",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1640,
        "y": 1360,
        "wires": [
            [
                "3faedeb97032897f"
            ]
        ]
    },
    {
        "id": "c6136e3d387673a3",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1640,
        "y": 1570,
        "wires": [
            [
                "bc0523857171ee1a"
            ]
        ]
    },
    {
        "id": "a489537dda6514a0",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM-220V\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM-200V\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1650,
        "y": 1780,
        "wires": [
            [
                "0d6c81161f195e5e"
            ]
        ]
    },
    {
        "id": "c7c50427e1760c84",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM-1F\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM-3F\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1650,
        "y": 1990,
        "wires": [
            [
                "2aa621e24f19d794"
            ]
        ]
    },
    {
        "id": "8b6443839784dd69",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM 220\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM 200\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1670,
        "y": 2620,
        "wires": [
            [
                "01b9e61b717f4094"
            ]
        ]
    },
    {
        "id": "2cde0be905cd26fa",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM_220V\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM_200V\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1650,
        "y": 2830,
        "wires": [
            [
                "9631d841612434a5"
            ]
        ]
    },
    {
        "id": "ce323c354721ca61",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "KUB Active Power",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_30\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_active_power (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1020,
        "y": 500,
        "wires": [
            [
                "884fb7d74803fb6e"
            ]
        ]
    },
    {
        "id": "7a24e53b64326428",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Camp Housing SAA PM220V",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CH_SAA\" && power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2140,
        "wires": [
            [
                "84cf2014fdbc5618"
            ]
        ]
    },
    {
        "id": "95db8e920b13d1b9",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Camp Housing SAA PM200V",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CH_SAA\" && power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2170,
        "wires": [
            [
                "84cf2014fdbc5618"
            ]
        ]
    },
    {
        "id": "84cf2014fdbc5618",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "324cafcc29429c41",
        "name": "",
        "x": 1280,
        "y": 2140,
        "wires": [
            [
                "13ce9b5ac5e21f05"
            ]
        ]
    },
    {
        "id": "0794fb23bd9731af",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "324cafcc29429c41",
        "name": "",
        "x": 1280,
        "y": 2180,
        "wires": [
            []
        ]
    },
    {
        "id": "4ea39d1b1ff952eb",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "ede383246ecefa61",
        "name": "",
        "x": 1280,
        "y": 2350,
        "wires": [
            [
                "f7ad787f5cc3da0e"
            ]
        ]
    },
    {
        "id": "8d09ec819dbd2782",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "ede383246ecefa61",
        "name": "",
        "x": 1280,
        "y": 2390,
        "wires": [
            []
        ]
    },
    {
        "id": "608d3abdf3be6895",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Camp Housing SAB PM200V",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CH_SAB\" && power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2380,
        "wires": [
            [
                "4ea39d1b1ff952eb"
            ]
        ]
    },
    {
        "id": "7edfeacf7992918e",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Camp Housing SAB PM220V",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CH_SAB\" && power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2350,
        "wires": [
            [
                "4ea39d1b1ff952eb"
            ]
        ]
    },
    {
        "id": "13ce9b5ac5e21f05",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1500,
        "y": 2140,
        "wires": [
            [
                "7df779c2f91c329c",
                "6a6abed55d4f0ece"
            ]
        ]
    },
    {
        "id": "6a6abed55d4f0ece",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CHCD 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM-1F\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1690,
        "y": 2170,
        "wires": [
            [
                "1a6a47ba740214b7"
            ]
        ]
    },
    {
        "id": "7df779c2f91c329c",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CHCD 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM-3F\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1690,
        "y": 2140,
        "wires": [
            [
                "1a6a47ba740214b7"
            ]
        ]
    },
    {
        "id": "ad5cfe0797149329",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM_220V\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM_200V\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1650,
        "y": 2200,
        "wires": [
            [
                "1a6a47ba740214b7"
            ]
        ]
    },
    {
        "id": "f7ad787f5cc3da0e",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1500,
        "y": 2350,
        "wires": [
            [
                "c79497b04ebecf4f",
                "542be6fbee368c10"
            ]
        ]
    },
    {
        "id": "542be6fbee368c10",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CHCD 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM-1F\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1690,
        "y": 2380,
        "wires": [
            [
                "f370f2a0175c82b5"
            ]
        ]
    },
    {
        "id": "c79497b04ebecf4f",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CHCD 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM-3F\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1690,
        "y": 2350,
        "wires": [
            [
                "f370f2a0175c82b5"
            ]
        ]
    },
    {
        "id": "d6115fc3e42fe939",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM-1F\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM-3F\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1650,
        "y": 2410,
        "wires": [
            [
                "f370f2a0175c82b5"
            ]
        ]
    },
    {
        "id": "1a6a47ba740214b7",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "324cafcc29429c41",
        "name": "",
        "x": 1920,
        "y": 2140,
        "wires": [
            []
        ]
    },
    {
        "id": "f370f2a0175c82b5",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "ede383246ecefa61",
        "name": "",
        "x": 1920,
        "y": 2350,
        "wires": [
            []
        ]
    },
    {
        "id": "76c3b23f50480aa6",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CONNECTOR_pm220",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CONN\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1010,
        "y": 3920,
        "wires": [
            [
                "706614dcab2bad4d"
            ]
        ]
    },
    {
        "id": "c3c173013da27077",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "CONNECTOR_pm200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CONN\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1010,
        "y": 3950,
        "wires": [
            [
                "706614dcab2bad4d"
            ]
        ]
    },
    {
        "id": "706614dcab2bad4d",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "fa18e28dc611e6be",
        "name": "",
        "x": 1320,
        "y": 3920,
        "wires": [
            [
                "b27c8f2500f04865"
            ]
        ]
    },
    {
        "id": "38856f8126c513bf",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "fa18e28dc611e6be",
        "name": "",
        "x": 1320,
        "y": 3960,
        "wires": [
            [
                "87421d93128c8db5"
            ]
        ]
    },
    {
        "id": "b27c8f2500f04865",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1540,
        "y": 3920,
        "wires": [
            [
                "f2954df943633bf8",
                "7114ed7dc5ad0cb5"
            ]
        ]
    },
    {
        "id": "7114ed7dc5ad0cb5",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CONN 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1730,
        "y": 3950,
        "wires": [
            [
                "8d7d7e10343aca76"
            ]
        ]
    },
    {
        "id": "f2954df943633bf8",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift CONN 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1730,
        "y": 3920,
        "wires": [
            [
                "8d7d7e10343aca76"
            ]
        ]
    },
    {
        "id": "87421d93128c8db5",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM_220V\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM_200V\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1690,
        "y": 3980,
        "wires": [
            [
                "8d7d7e10343aca76"
            ]
        ]
    },
    {
        "id": "8d7d7e10343aca76",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "fa18e28dc611e6be",
        "name": "",
        "x": 1960,
        "y": 3920,
        "wires": [
            []
        ]
    },
    {
        "id": "f15bcd9c9a7285da",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "9812f06702c58bdc",
        "name": "",
        "x": 1260,
        "y": 1090,
        "wires": [
            [
                "7ca3541ca7b9b49b"
            ]
        ]
    },
    {
        "id": "738b7ef9f9218883",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "9812f06702c58bdc",
        "name": "",
        "x": 1260,
        "y": 1130,
        "wires": [
            [
                "897ec9b51b518257"
            ]
        ]
    },
    {
        "id": "21d194a8a380b95b",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HLA  ALL PM 200",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"HLA\" && power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1020,
        "y": 1090,
        "wires": [
            [
                "f15bcd9c9a7285da"
            ]
        ]
    },
    {
        "id": "da7a27fa8f24c18f",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "HLA  ALL PM 220",
        "func": "var panel = msg.payload[1];\nvar power_meter = msg.payload[2];\nvar value = msg.payload[3];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"HLA\" && power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1020,
        "y": 1120,
        "wires": [
            []
        ]
    },
    {
        "id": "79d3bcd98236ac2f",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 940,
        "wires": [
            [
                "419bce12e10a0dbb"
            ]
        ]
    },
    {
        "id": "6bf055b77665e235",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 970,
        "wires": [
            [
                "419bce12e10a0dbb"
            ]
        ]
    },
    {
        "id": "4a5840bb00a976d7",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption kub",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_kub ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1000,
        "y": 590,
        "wires": [
            [
                "8deda76cc8ec3a9f"
            ]
        ]
    },
    {
        "id": "710505f596b6fb2d",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm kub",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_kubikal ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 560,
        "wires": [
            [
                "884fb7d74803fb6e"
            ]
        ]
    },
    {
        "id": "64991334510ac15b",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1000,
        "wires": [
            [
                "7a960b93f83cdb95"
            ]
        ]
    },
    {
        "id": "f25caec9cb70a5bf",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1030,
        "wires": [
            [
                "7a960b93f83cdb95"
            ]
        ]
    },
    {
        "id": "e4bab29947b1d65d",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1150,
        "wires": [
            []
        ]
    },
    {
        "id": "39ddcea76428cd85",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1180,
        "wires": [
            [
                "f15bcd9c9a7285da"
            ]
        ]
    },
    {
        "id": "f016b764822c630e",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1210,
        "wires": [
            []
        ]
    },
    {
        "id": "6e92a0863c7d0236",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1240,
        "wires": [
            [
                "738b7ef9f9218883"
            ]
        ]
    },
    {
        "id": "973e9601d0bca23d",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1360,
        "wires": [
            [
                "8594c6d01f39935c"
            ]
        ]
    },
    {
        "id": "aa2660942a8676b0",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1390,
        "wires": [
            [
                "8594c6d01f39935c"
            ]
        ]
    },
    {
        "id": "df7a75828bfd626a",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1420,
        "wires": [
            [
                "5e4fb3d1303123fa"
            ]
        ]
    },
    {
        "id": "bca99993cd57e29d",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1450,
        "wires": [
            [
                "5e4fb3d1303123fa"
            ]
        ]
    },
    {
        "id": "5b5cb42bb65c2b73",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1570,
        "wires": [
            [
                "89927f25691ea8f6"
            ]
        ]
    },
    {
        "id": "1bd2abf8ef580506",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1600,
        "wires": [
            [
                "89927f25691ea8f6"
            ]
        ]
    },
    {
        "id": "a966cbfb7c7a964d",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1630,
        "wires": [
            [
                "8601cfc19ec8bc9f"
            ]
        ]
    },
    {
        "id": "b3884fbd81667420",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1660,
        "wires": [
            [
                "8601cfc19ec8bc9f"
            ]
        ]
    },
    {
        "id": "2b05b1ca80970e49",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1780,
        "wires": [
            [
                "e0a3f977fee8a455"
            ]
        ]
    },
    {
        "id": "0ba13b2f2043b883",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1810,
        "wires": [
            [
                "e0a3f977fee8a455"
            ]
        ]
    },
    {
        "id": "114e1724de53521e",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1840,
        "wires": [
            [
                "202b03d4e972864e"
            ]
        ]
    },
    {
        "id": "6cc24c10a9d68b8f",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1870,
        "wires": [
            [
                "202b03d4e972864e"
            ]
        ]
    },
    {
        "id": "305751a25ad207c4",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1990,
        "wires": [
            [
                "410ac8053836fab2"
            ]
        ]
    },
    {
        "id": "995c76ada30f142c",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2020,
        "wires": [
            [
                "410ac8053836fab2"
            ]
        ]
    },
    {
        "id": "50d003c47f5cc819",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2050,
        "wires": [
            [
                "063f268c2ec8dbf6"
            ]
        ]
    },
    {
        "id": "4ee21e69521c4ed3",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2080,
        "wires": [
            [
                "063f268c2ec8dbf6"
            ]
        ]
    },
    {
        "id": "1ab096243b257f0e",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2200,
        "wires": [
            [
                "84cf2014fdbc5618"
            ]
        ]
    },
    {
        "id": "789d6292e6f2e1b1",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2230,
        "wires": [
            [
                "84cf2014fdbc5618"
            ]
        ]
    },
    {
        "id": "189154acaa7ee789",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2260,
        "wires": [
            [
                "0794fb23bd9731af"
            ]
        ]
    },
    {
        "id": "562e998b12652c85",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2290,
        "wires": [
            [
                "0794fb23bd9731af"
            ]
        ]
    },
    {
        "id": "addee7138a04b3a2",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2410,
        "wires": [
            [
                "4ea39d1b1ff952eb"
            ]
        ]
    },
    {
        "id": "b055267ac95491e2",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2440,
        "wires": [
            [
                "4ea39d1b1ff952eb"
            ]
        ]
    },
    {
        "id": "51fb9eaa5a3f0b92",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2470,
        "wires": [
            [
                "8d09ec819dbd2782"
            ]
        ]
    },
    {
        "id": "4131c56c38822839",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2500,
        "wires": [
            [
                "8d09ec819dbd2782"
            ]
        ]
    },
    {
        "id": "76b3f359d8e9684d",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2620,
        "wires": [
            [
                "f8e28481f9878d3e"
            ]
        ]
    },
    {
        "id": "49f4a74d4551ea0a",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2650,
        "wires": [
            [
                "f8e28481f9878d3e"
            ]
        ]
    },
    {
        "id": "6c825e8bc5e9bd45",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2680,
        "wires": [
            [
                "72c27f31de4efdbc"
            ]
        ]
    },
    {
        "id": "649e41b34e7107fb",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2710,
        "wires": [
            [
                "72c27f31de4efdbc"
            ]
        ]
    },
    {
        "id": "ed6827dd34e53389",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2830,
        "wires": [
            [
                "ae205936b5759d21"
            ]
        ]
    },
    {
        "id": "77e13fdb5de3054c",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2860,
        "wires": [
            [
                "ae205936b5759d21"
            ]
        ]
    },
    {
        "id": "034241a4dd458d31",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2890,
        "wires": [
            [
                "becf6a0eb24983df"
            ]
        ]
    },
    {
        "id": "e673e34748fa8605",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 2920,
        "wires": [
            [
                "becf6a0eb24983df"
            ]
        ]
    },
    {
        "id": "0c402aded1282609",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 3770,
        "wires": [
            [
                "be10e1a38eda0b19"
            ]
        ]
    },
    {
        "id": "a085b8f098c74fed",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 3800,
        "wires": [
            [
                "be10e1a38eda0b19"
            ]
        ]
    },
    {
        "id": "5194723f20f9bbc2",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 3830,
        "wires": [
            [
                "50159503ec62afbe"
            ]
        ]
    },
    {
        "id": "6d0a4694284e2d3c",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 3860,
        "wires": [
            [
                "50159503ec62afbe"
            ]
        ]
    },
    {
        "id": "120b5af1d692828b",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 3980,
        "wires": [
            [
                "706614dcab2bad4d"
            ]
        ]
    },
    {
        "id": "97d5a4d4c8b59816",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 4010,
        "wires": [
            []
        ]
    },
    {
        "id": "78e85ab52341e822",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 4040,
        "wires": [
            [
                "38856f8126c513bf"
            ]
        ]
    },
    {
        "id": "48e441bd31144bb5",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 4070,
        "wires": [
            []
        ]
    },
    {
        "id": "e3afc7ec38cea540",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 4160,
        "wires": [
            [
                "d25fac65c229b592"
            ]
        ]
    },
    {
        "id": "e79198e19fda9067",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 4190,
        "wires": [
            []
        ]
    },
    {
        "id": "fd011125b1fe6f9d",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 4220,
        "wires": [
            [
                "cf9d589928d884ba"
            ]
        ]
    },
    {
        "id": "2411f9e874bf031e",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 4250,
        "wires": [
            []
        ]
    },
    {
        "id": "d94788b272e9e940",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 4520,
        "wires": [
            [
                "a97f99ed3cb4cc56"
            ]
        ]
    },
    {
        "id": "46269be8e2bf4d70",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 4550,
        "wires": [
            [
                "a97f99ed3cb4cc56"
            ]
        ]
    },
    {
        "id": "f5a1b133ee67ef0e",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 4580,
        "wires": [
            [
                "b8d40d0dce961f1e"
            ]
        ]
    },
    {
        "id": "4f2095ed75b270de",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 4610,
        "wires": [
            [
                "b8d40d0dce961f1e"
            ]
        ]
    },
    {
        "id": "f74be5e9a270fb9e",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 4730,
        "wires": [
            [
                "992555be16298227"
            ]
        ]
    },
    {
        "id": "545e9646d9f20f42",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 4760,
        "wires": [
            [
                "992555be16298227"
            ]
        ]
    },
    {
        "id": "d5411bd881cd7ffe",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 4790,
        "wires": [
            [
                "a519431b6c88de21"
            ]
        ]
    },
    {
        "id": "041ef7066a9719b8",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 4820,
        "wires": [
            [
                "a519431b6c88de21"
            ]
        ]
    },
    {
        "id": "1b88ecad49e99cf3",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 4940,
        "wires": [
            [
                "bc05b8bae92b4cb8"
            ]
        ]
    },
    {
        "id": "f92b63326a6aa298",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 4970,
        "wires": [
            [
                "bc05b8bae92b4cb8"
            ]
        ]
    },
    {
        "id": "c58c9f0809dd286b",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 5000,
        "wires": [
            [
                "821ddbbaaf3d5da9"
            ]
        ]
    },
    {
        "id": "80f0d39fbec2b045",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 5030,
        "wires": [
            [
                "821ddbbaaf3d5da9"
            ]
        ]
    },
    {
        "id": "c747ae26195ad100",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 5150,
        "wires": [
            [
                "fad23c7e655e4b14"
            ]
        ]
    },
    {
        "id": "4cd62ed091bbd16b",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 5180,
        "wires": [
            [
                "fad23c7e655e4b14"
            ]
        ]
    },
    {
        "id": "126b6a1786ca3ebe",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 5210,
        "wires": [
            [
                "ece37a70275e23c6"
            ]
        ]
    },
    {
        "id": "ff951fe2c6369662",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 5240,
        "wires": [
            [
                "ece37a70275e23c6"
            ]
        ]
    },
    {
        "id": "94c8c09bc081fb45",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 5360,
        "wires": [
            [
                "76d2734168bd48f6"
            ]
        ]
    },
    {
        "id": "3a44666564238e16",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 5390,
        "wires": [
            [
                "76d2734168bd48f6"
            ]
        ]
    },
    {
        "id": "408af58da525771b",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 5420,
        "wires": [
            [
                "76d2734168bd48f6"
            ]
        ]
    },
    {
        "id": "2fadfda07e507ca6",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 5450,
        "wires": [
            [
                "76d2734168bd48f6"
            ]
        ]
    },
    {
        "id": "c656dcfbeb1dce09",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 5570,
        "wires": [
            [
                "b656ab641d819758"
            ]
        ]
    },
    {
        "id": "006d21fe5e0c8c7b",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 5600,
        "wires": [
            [
                "b656ab641d819758"
            ]
        ]
    },
    {
        "id": "22e7d42afa9f42f2",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 5630,
        "wires": [
            [
                "e35fe574aeba550d"
            ]
        ]
    },
    {
        "id": "e7ec20bda8c9e35b",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 5660,
        "wires": [
            [
                "e35fe574aeba550d"
            ]
        ]
    },
    {
        "id": "74fdd6a5f977c514",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 5780,
        "wires": [
            [
                "78392a252f6eaf6c"
            ]
        ]
    },
    {
        "id": "1fd6e2d50bf11b76",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 5810,
        "wires": [
            [
                "78392a252f6eaf6c"
            ]
        ]
    },
    {
        "id": "ce33c92452cf4994",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 5840,
        "wires": [
            [
                "1f96f2cb143c41ac"
            ]
        ]
    },
    {
        "id": "98b50fc1b574f077",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 5870,
        "wires": [
            [
                "1f96f2cb143c41ac"
            ]
        ]
    },
    {
        "id": "74ae0440dc732471",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 5990,
        "wires": [
            [
                "81f9f20646b4ca1c"
            ]
        ]
    },
    {
        "id": "9a9fd4e3bafdf0e6",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 6020,
        "wires": [
            [
                "81f9f20646b4ca1c"
            ]
        ]
    },
    {
        "id": "90e668724a80c2e2",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 6050,
        "wires": [
            [
                "68fecb4c5743fff3"
            ]
        ]
    },
    {
        "id": "b0e3fb8ddb6f8492",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 6080,
        "wires": [
            [
                "68fecb4c5743fff3"
            ]
        ]
    },
    {
        "id": "6c8edc5ff46d405b",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 6200,
        "wires": [
            [
                "d5a07250d6219f92"
            ]
        ]
    },
    {
        "id": "ebce201c8d14b34c",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 6230,
        "wires": [
            [
                "d5a07250d6219f92"
            ]
        ]
    },
    {
        "id": "68da520d82215f01",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 6260,
        "wires": [
            [
                "230f57d45207a4a4"
            ]
        ]
    },
    {
        "id": "dbd7b2c165063057",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 6290,
        "wires": [
            [
                "230f57d45207a4a4"
            ]
        ]
    },
    {
        "id": "d1d48e4f2b2c6ed8",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 6410,
        "wires": [
            [
                "83414391cd8c7ec7"
            ]
        ]
    },
    {
        "id": "9e794373377c4207",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 6440,
        "wires": [
            [
                "83414391cd8c7ec7"
            ]
        ]
    },
    {
        "id": "2b0cb639f041cfef",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 6470,
        "wires": [
            [
                "372488a6b97bfb8f"
            ]
        ]
    },
    {
        "id": "6b0ae7b1a0cbcb95",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 6500,
        "wires": [
            [
                "372488a6b97bfb8f"
            ]
        ]
    },
    {
        "id": "78196f8aade9c10b",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 6620,
        "wires": [
            [
                "6105490593a4aef5"
            ]
        ]
    },
    {
        "id": "4200b627e4b16e9c",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 6650,
        "wires": [
            [
                "6105490593a4aef5"
            ]
        ]
    },
    {
        "id": "bede9daca46a5128",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 6680,
        "wires": [
            [
                "37cbd8da14948cda"
            ]
        ]
    },
    {
        "id": "2f20084da7d098aa",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 6710,
        "wires": [
            [
                "37cbd8da14948cda"
            ]
        ]
    },
    {
        "id": "e8b07eb45d451ec3",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 6830,
        "wires": [
            [
                "73a64b6fd42059bd"
            ]
        ]
    },
    {
        "id": "d98418d20fea2fff",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 6860,
        "wires": [
            [
                "73a64b6fd42059bd"
            ]
        ]
    },
    {
        "id": "4a7129578b20792f",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 6890,
        "wires": [
            [
                "e7eef7f498546203"
            ]
        ]
    },
    {
        "id": "8f8f08c87575a1cb",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 6920,
        "wires": [
            [
                "e7eef7f498546203"
            ]
        ]
    },
    {
        "id": "3ec85a310ca9d931",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 410,
        "y": 6500,
        "wires": [
            []
        ]
    },
    {
        "id": "d7be0a277ec69215",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 410,
        "y": 6530,
        "wires": [
            []
        ]
    },
    {
        "id": "fb66807553ea92ff",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 410,
        "y": 6560,
        "wires": [
            []
        ]
    },
    {
        "id": "595c1f6ff1f8dd0a",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 410,
        "y": 6590,
        "wires": [
            []
        ]
    },
    {
        "id": "cb97dadf2cfc4674",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 1000,
        "wires": [
            [
                "64991334510ac15b",
                "f25caec9cb70a5bf"
            ]
        ]
    },
    {
        "id": "a275c75b0c05748d",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 940,
        "wires": [
            [
                "79d3bcd98236ac2f",
                "6bf055b77665e235"
            ]
        ]
    },
    {
        "id": "886af6e269a64014",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 970,
        "wires": [
            [
                "79d3bcd98236ac2f",
                "6bf055b77665e235"
            ]
        ]
    },
    {
        "id": "57558c4ba19d2237",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 1030,
        "wires": [
            [
                "64991334510ac15b",
                "f25caec9cb70a5bf"
            ]
        ]
    },
    {
        "id": "5415aeac5b4c38c5",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 1210,
        "wires": [
            [
                "f016b764822c630e",
                "6e92a0863c7d0236"
            ]
        ]
    },
    {
        "id": "57cfef2baa420bac",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 1150,
        "wires": [
            [
                "e4bab29947b1d65d",
                "39ddcea76428cd85"
            ]
        ]
    },
    {
        "id": "0297c67c1aa5edf1",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 1180,
        "wires": [
            [
                "e4bab29947b1d65d",
                "39ddcea76428cd85"
            ]
        ]
    },
    {
        "id": "47de5e2edf89a540",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 1240,
        "wires": [
            [
                "f016b764822c630e",
                "6e92a0863c7d0236"
            ]
        ]
    },
    {
        "id": "c4e1ec0d809972b6",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 1420,
        "wires": [
            [
                "df7a75828bfd626a",
                "bca99993cd57e29d"
            ]
        ]
    },
    {
        "id": "5183c8aa76c87a17",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 1360,
        "wires": [
            [
                "973e9601d0bca23d",
                "aa2660942a8676b0"
            ]
        ]
    },
    {
        "id": "f052a1a91df4420c",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 1390,
        "wires": [
            [
                "973e9601d0bca23d",
                "aa2660942a8676b0"
            ]
        ]
    },
    {
        "id": "93b356c63835bdca",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 1450,
        "wires": [
            [
                "df7a75828bfd626a",
                "bca99993cd57e29d"
            ]
        ]
    },
    {
        "id": "6cad7af364f99f28",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 1630,
        "wires": [
            [
                "a966cbfb7c7a964d",
                "b3884fbd81667420"
            ]
        ]
    },
    {
        "id": "865cf8ee35cdf0c3",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 1570,
        "wires": [
            [
                "5b5cb42bb65c2b73",
                "1bd2abf8ef580506"
            ]
        ]
    },
    {
        "id": "dd7d79880acfe12d",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 1600,
        "wires": [
            [
                "5b5cb42bb65c2b73",
                "1bd2abf8ef580506"
            ]
        ]
    },
    {
        "id": "300717cf13f24b64",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 1660,
        "wires": [
            [
                "a966cbfb7c7a964d",
                "b3884fbd81667420"
            ]
        ]
    },
    {
        "id": "aba23a0f8d5b23e7",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 1840,
        "wires": [
            [
                "114e1724de53521e",
                "6cc24c10a9d68b8f"
            ]
        ]
    },
    {
        "id": "58e1bfc13d9b8ead",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 1780,
        "wires": [
            [
                "2b05b1ca80970e49",
                "0ba13b2f2043b883"
            ]
        ]
    },
    {
        "id": "1af2c1aa9f14d9a0",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 1810,
        "wires": [
            [
                "2b05b1ca80970e49",
                "0ba13b2f2043b883"
            ]
        ]
    },
    {
        "id": "ab27794b0952c92a",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 1870,
        "wires": [
            [
                "114e1724de53521e",
                "6cc24c10a9d68b8f"
            ]
        ]
    },
    {
        "id": "48afc1163c234e0b",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 2050,
        "wires": [
            [
                "50d003c47f5cc819",
                "4ee21e69521c4ed3"
            ]
        ]
    },
    {
        "id": "29314f266b8a19a1",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 1990,
        "wires": [
            [
                "305751a25ad207c4",
                "995c76ada30f142c"
            ]
        ]
    },
    {
        "id": "9a57b34731df758e",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 2020,
        "wires": [
            [
                "305751a25ad207c4",
                "995c76ada30f142c"
            ]
        ]
    },
    {
        "id": "dedd4e40be6bf8f5",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 2080,
        "wires": [
            [
                "50d003c47f5cc819",
                "4ee21e69521c4ed3"
            ]
        ]
    },
    {
        "id": "56addec2bc8f067f",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 2260,
        "wires": [
            [
                "189154acaa7ee789",
                "562e998b12652c85"
            ]
        ]
    },
    {
        "id": "c4af6351d2a795b9",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 2200,
        "wires": [
            [
                "1ab096243b257f0e",
                "789d6292e6f2e1b1"
            ]
        ]
    },
    {
        "id": "acfaad1f570fb93d",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 2230,
        "wires": [
            [
                "1ab096243b257f0e",
                "789d6292e6f2e1b1"
            ]
        ]
    },
    {
        "id": "e673f79357a4e8e7",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 2290,
        "wires": [
            [
                "189154acaa7ee789",
                "562e998b12652c85"
            ]
        ]
    },
    {
        "id": "8a028527ae44cf4a",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 2470,
        "wires": [
            [
                "51fb9eaa5a3f0b92",
                "4131c56c38822839"
            ]
        ]
    },
    {
        "id": "889fdf9e99d87f5c",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 2410,
        "wires": [
            [
                "addee7138a04b3a2",
                "b055267ac95491e2"
            ]
        ]
    },
    {
        "id": "33d2bfc755e318c0",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 2440,
        "wires": [
            [
                "addee7138a04b3a2",
                "b055267ac95491e2"
            ]
        ]
    },
    {
        "id": "06a882f43ab330cd",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 2500,
        "wires": [
            [
                "51fb9eaa5a3f0b92",
                "4131c56c38822839"
            ]
        ]
    },
    {
        "id": "961894508ac0b8e2",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 2680,
        "wires": [
            [
                "6c825e8bc5e9bd45",
                "649e41b34e7107fb"
            ]
        ]
    },
    {
        "id": "4b054035264a0b83",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 2620,
        "wires": [
            [
                "76b3f359d8e9684d",
                "49f4a74d4551ea0a"
            ]
        ]
    },
    {
        "id": "15256f0c7a157ab8",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 2650,
        "wires": [
            [
                "76b3f359d8e9684d",
                "49f4a74d4551ea0a"
            ]
        ]
    },
    {
        "id": "6404be8d3e589b92",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 2710,
        "wires": [
            [
                "6c825e8bc5e9bd45",
                "649e41b34e7107fb"
            ]
        ]
    },
    {
        "id": "2a197bf6da0fe53a",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 2890,
        "wires": [
            [
                "034241a4dd458d31",
                "e673e34748fa8605"
            ]
        ]
    },
    {
        "id": "140f5381a1333637",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 2830,
        "wires": [
            [
                "ed6827dd34e53389",
                "77e13fdb5de3054c"
            ]
        ]
    },
    {
        "id": "ab63f29811f5e88c",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 2860,
        "wires": [
            [
                "ed6827dd34e53389",
                "77e13fdb5de3054c"
            ]
        ]
    },
    {
        "id": "e81e1cf5624fae6b",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 2920,
        "wires": [
            [
                "034241a4dd458d31",
                "e673e34748fa8605"
            ]
        ]
    },
    {
        "id": "4fea99769f0e9b1f",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 3830,
        "wires": [
            [
                "5194723f20f9bbc2",
                "6d0a4694284e2d3c"
            ]
        ]
    },
    {
        "id": "3e6c04f498b6d97c",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 3770,
        "wires": [
            [
                "0c402aded1282609",
                "a085b8f098c74fed"
            ]
        ]
    },
    {
        "id": "92db62fcf91ba8dc",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 3800,
        "wires": [
            [
                "0c402aded1282609",
                "a085b8f098c74fed"
            ]
        ]
    },
    {
        "id": "e4b0d51a6f4a36a5",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 3860,
        "wires": [
            [
                "5194723f20f9bbc2",
                "6d0a4694284e2d3c"
            ]
        ]
    },
    {
        "id": "bd22514fa2fa6204",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 4040,
        "wires": [
            [
                "78e85ab52341e822",
                "48e441bd31144bb5"
            ]
        ]
    },
    {
        "id": "72eca3890d85e95d",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 3980,
        "wires": [
            [
                "120b5af1d692828b",
                "97d5a4d4c8b59816"
            ]
        ]
    },
    {
        "id": "af3cb33b7df2ade0",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 4010,
        "wires": [
            [
                "120b5af1d692828b",
                "97d5a4d4c8b59816"
            ]
        ]
    },
    {
        "id": "2b0141d545ab03ad",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 4070,
        "wires": [
            [
                "78e85ab52341e822",
                "48e441bd31144bb5"
            ]
        ]
    },
    {
        "id": "29da101ba5ee882f",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 4220,
        "wires": [
            [
                "fd011125b1fe6f9d",
                "2411f9e874bf031e"
            ]
        ]
    },
    {
        "id": "94ab3d6c6831f34f",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 4160,
        "wires": [
            [
                "e3afc7ec38cea540",
                "e79198e19fda9067"
            ]
        ]
    },
    {
        "id": "b69331713da2c376",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 4190,
        "wires": [
            [
                "e3afc7ec38cea540",
                "e79198e19fda9067"
            ]
        ]
    },
    {
        "id": "9dfb95310e4fc24b",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 4250,
        "wires": [
            [
                "fd011125b1fe6f9d",
                "2411f9e874bf031e"
            ]
        ]
    },
    {
        "id": "93926dd09b5bb9b3",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 4580,
        "wires": [
            [
                "f5a1b133ee67ef0e",
                "4f2095ed75b270de"
            ]
        ]
    },
    {
        "id": "4c8f47809890bcd6",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 4520,
        "wires": [
            [
                "d94788b272e9e940",
                "46269be8e2bf4d70"
            ]
        ]
    },
    {
        "id": "b8b453f271ff2f72",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 4550,
        "wires": [
            [
                "d94788b272e9e940",
                "46269be8e2bf4d70"
            ]
        ]
    },
    {
        "id": "de7176566eef3e0f",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 4610,
        "wires": [
            [
                "f5a1b133ee67ef0e",
                "4f2095ed75b270de"
            ]
        ]
    },
    {
        "id": "6b325a6d636ac348",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 4790,
        "wires": [
            [
                "d5411bd881cd7ffe",
                "041ef7066a9719b8"
            ]
        ]
    },
    {
        "id": "b691d24b24b081b1",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 4730,
        "wires": [
            [
                "f74be5e9a270fb9e",
                "545e9646d9f20f42"
            ]
        ]
    },
    {
        "id": "1de33226ca2d63b0",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 4760,
        "wires": [
            [
                "f74be5e9a270fb9e",
                "545e9646d9f20f42"
            ]
        ]
    },
    {
        "id": "09342638fc45f2c5",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 4820,
        "wires": [
            [
                "d5411bd881cd7ffe",
                "041ef7066a9719b8"
            ]
        ]
    },
    {
        "id": "969151bfb9082962",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 5000,
        "wires": [
            [
                "c58c9f0809dd286b",
                "80f0d39fbec2b045"
            ]
        ]
    },
    {
        "id": "4638d6f35bbe4d0d",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 4940,
        "wires": [
            [
                "1b88ecad49e99cf3",
                "f92b63326a6aa298"
            ]
        ]
    },
    {
        "id": "8fda42e82bf692c1",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 4970,
        "wires": [
            [
                "1b88ecad49e99cf3",
                "f92b63326a6aa298"
            ]
        ]
    },
    {
        "id": "b6c77df00779623e",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 5030,
        "wires": [
            [
                "c58c9f0809dd286b",
                "80f0d39fbec2b045"
            ]
        ]
    },
    {
        "id": "93a972fd577148a4",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 5210,
        "wires": [
            [
                "126b6a1786ca3ebe",
                "ff951fe2c6369662"
            ]
        ]
    },
    {
        "id": "1f818a37148284df",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 5150,
        "wires": [
            [
                "c747ae26195ad100",
                "4cd62ed091bbd16b"
            ]
        ]
    },
    {
        "id": "94f76486bc8f1757",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 5180,
        "wires": [
            [
                "c747ae26195ad100",
                "4cd62ed091bbd16b"
            ]
        ]
    },
    {
        "id": "112631882da28e1d",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 5240,
        "wires": [
            [
                "126b6a1786ca3ebe",
                "ff951fe2c6369662"
            ]
        ]
    },
    {
        "id": "e8684e2584b04fe8",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 5420,
        "wires": [
            [
                "408af58da525771b",
                "2fadfda07e507ca6"
            ]
        ]
    },
    {
        "id": "e6b6a82e68ac89b5",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 5360,
        "wires": [
            [
                "94c8c09bc081fb45",
                "3a44666564238e16"
            ]
        ]
    },
    {
        "id": "17411e7139f511bb",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 5390,
        "wires": [
            [
                "94c8c09bc081fb45",
                "3a44666564238e16"
            ]
        ]
    },
    {
        "id": "066e0dae6b85df33",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 5450,
        "wires": [
            [
                "408af58da525771b",
                "2fadfda07e507ca6"
            ]
        ]
    },
    {
        "id": "a9e22c8593d29da9",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 5630,
        "wires": [
            [
                "22e7d42afa9f42f2",
                "e7ec20bda8c9e35b"
            ]
        ]
    },
    {
        "id": "69492df2d0766caf",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 5570,
        "wires": [
            [
                "c656dcfbeb1dce09",
                "006d21fe5e0c8c7b"
            ]
        ]
    },
    {
        "id": "6a0bc851724ff394",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 5600,
        "wires": [
            [
                "c656dcfbeb1dce09",
                "006d21fe5e0c8c7b"
            ]
        ]
    },
    {
        "id": "536c23c649384c56",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 5660,
        "wires": [
            [
                "22e7d42afa9f42f2",
                "e7ec20bda8c9e35b"
            ]
        ]
    },
    {
        "id": "dcad15abea80fcd1",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 5840,
        "wires": [
            [
                "ce33c92452cf4994",
                "98b50fc1b574f077"
            ]
        ]
    },
    {
        "id": "bac6c8861a1ca264",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 5780,
        "wires": [
            [
                "74fdd6a5f977c514",
                "1fd6e2d50bf11b76"
            ]
        ]
    },
    {
        "id": "149b1dcb60b3351b",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 5810,
        "wires": [
            [
                "74fdd6a5f977c514",
                "1fd6e2d50bf11b76"
            ]
        ]
    },
    {
        "id": "d0a93445cd6bfb62",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 5870,
        "wires": [
            [
                "ce33c92452cf4994",
                "98b50fc1b574f077"
            ]
        ]
    },
    {
        "id": "2d86be5032b9cbe7",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 6050,
        "wires": [
            [
                "90e668724a80c2e2",
                "b0e3fb8ddb6f8492"
            ]
        ]
    },
    {
        "id": "9a118a9f8dffd943",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 5990,
        "wires": [
            [
                "74ae0440dc732471",
                "9a9fd4e3bafdf0e6"
            ]
        ]
    },
    {
        "id": "baee9f875b48d597",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 6020,
        "wires": [
            [
                "74ae0440dc732471",
                "9a9fd4e3bafdf0e6"
            ]
        ]
    },
    {
        "id": "d91512727eaa44b1",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 6080,
        "wires": [
            [
                "90e668724a80c2e2",
                "b0e3fb8ddb6f8492"
            ]
        ]
    },
    {
        "id": "71f20258f4007c08",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 6260,
        "wires": [
            [
                "68da520d82215f01",
                "dbd7b2c165063057"
            ]
        ]
    },
    {
        "id": "f6da36aa7c29c854",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 6200,
        "wires": [
            [
                "6c8edc5ff46d405b",
                "ebce201c8d14b34c"
            ]
        ]
    },
    {
        "id": "b8541a08857b24a8",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 6230,
        "wires": [
            [
                "6c8edc5ff46d405b",
                "ebce201c8d14b34c"
            ]
        ]
    },
    {
        "id": "d42f7a2a5a7de701",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 6290,
        "wires": [
            [
                "68da520d82215f01",
                "dbd7b2c165063057"
            ]
        ]
    },
    {
        "id": "7a234256cf7eb0d4",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 6470,
        "wires": [
            [
                "2b0cb639f041cfef",
                "6b0ae7b1a0cbcb95"
            ]
        ]
    },
    {
        "id": "0aee8ecf799430ec",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 6410,
        "wires": [
            [
                "d1d48e4f2b2c6ed8",
                "9e794373377c4207"
            ]
        ]
    },
    {
        "id": "c880c29578edd5ca",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 6440,
        "wires": [
            [
                "d1d48e4f2b2c6ed8",
                "9e794373377c4207"
            ]
        ]
    },
    {
        "id": "3cfec7aeb2754d54",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 6500,
        "wires": [
            [
                "2b0cb639f041cfef",
                "6b0ae7b1a0cbcb95"
            ]
        ]
    },
    {
        "id": "936c4f3c3c29426d",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 6680,
        "wires": [
            [
                "bede9daca46a5128",
                "2f20084da7d098aa"
            ]
        ]
    },
    {
        "id": "84b0f409763287b0",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 6620,
        "wires": [
            [
                "78196f8aade9c10b",
                "4200b627e4b16e9c"
            ]
        ]
    },
    {
        "id": "c6c16a8f8713d0a1",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 6650,
        "wires": [
            [
                "78196f8aade9c10b",
                "4200b627e4b16e9c"
            ]
        ]
    },
    {
        "id": "a8c0c46a6cd489fa",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 6710,
        "wires": [
            [
                "bede9daca46a5128",
                "2f20084da7d098aa"
            ]
        ]
    },
    {
        "id": "0db2346c824364e4",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 6890,
        "wires": [
            [
                "4a7129578b20792f",
                "8f8f08c87575a1cb"
            ]
        ]
    },
    {
        "id": "91d76dc9dbf75018",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 6830,
        "wires": [
            [
                "e8b07eb45d451ec3",
                "d98418d20fea2fff"
            ]
        ]
    },
    {
        "id": "a8f72ba9422ead98",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 6860,
        "wires": [
            [
                "e8b07eb45d451ec3",
                "d98418d20fea2fff"
            ]
        ]
    },
    {
        "id": "0f2e161217651dce",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 6920,
        "wires": [
            [
                "4a7129578b20792f",
                "8f8f08c87575a1cb"
            ]
        ]
    },
    {
        "id": "23d82f74cd83904a",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 130,
        "y": 6560,
        "wires": [
            [
                "fb66807553ea92ff",
                "595c1f6ff1f8dd0a"
            ]
        ]
    },
    {
        "id": "a576e981975813ef",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 80,
        "y": 6500,
        "wires": [
            [
                "3ec85a310ca9d931",
                "d7be0a277ec69215",
                "4f871656e7e96928"
            ]
        ]
    },
    {
        "id": "0382cbcb1750638a",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 80,
        "y": 6530,
        "wires": [
            [
                "3ec85a310ca9d931",
                "d7be0a277ec69215",
                "4f871656e7e96928"
            ]
        ]
    },
    {
        "id": "0b929ac66037ad0b",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 130,
        "y": 6590,
        "wires": [
            [
                "fb66807553ea92ff",
                "595c1f6ff1f8dd0a"
            ]
        ]
    },
    {
        "id": "7ca3541ca7b9b49b",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1490,
        "y": 1090,
        "wires": [
            [
                "c2486078628220ee",
                "3e6d9694a21acd13"
            ]
        ]
    },
    {
        "id": "3e6d9694a21acd13",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift HLA 220",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1680,
        "y": 1120,
        "wires": [
            [
                "ab295f289056b0b6"
            ]
        ]
    },
    {
        "id": "c2486078628220ee",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift  HLA 200",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1680,
        "y": 1090,
        "wires": [
            [
                "ab295f289056b0b6"
            ]
        ]
    },
    {
        "id": "ab295f289056b0b6",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "9812f06702c58bdc",
        "name": "",
        "x": 1890,
        "y": 1090,
        "wires": [
            []
        ]
    },
    {
        "id": "897ec9b51b518257",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM_220V\"){\n    msg.topic = `UPDATE tb_pershift_pm220 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM_200V\"){\n    msg.topic = `UPDATE tb_pershift_pm200 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1640,
        "y": 1150,
        "wires": [
            [
                "ab295f289056b0b6"
            ]
        ]
    },
    {
        "id": "6da3d9c974fdf748",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "day",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "50 23 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 640,
        "y": 1060,
        "wires": [
            []
        ]
    },
    {
        "id": "8db0a811da254b8a",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "day",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "50 23 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 640,
        "y": 1270,
        "wires": [
            []
        ]
    },
    {
        "id": "16d00182bbd5d5f5",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "day",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "50 23 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 640,
        "y": 1480,
        "wires": [
            []
        ]
    },
    {
        "id": "523dadcbb916f7ab",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "4e8cb6578baa1850",
        "name": "",
        "x": 1300,
        "y": 7270,
        "wires": [
            [
                "e255f7f8f12fc812"
            ]
        ]
    },
    {
        "id": "7aa5e324b9de4d88",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200 1",
        "func": "msg.topic = \"SELECT * FROM tb_total_kwh_pm200 WHERE power_meter = 'PM_200_1' ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 7300,
        "wires": [
            [
                "523dadcbb916f7ab"
            ]
        ]
    },
    {
        "id": "ac9f9e9b400a446e",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200 1",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200_1 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 7360,
        "wires": [
            [
                "dc2b8e456706e740"
            ]
        ]
    },
    {
        "id": "e17e801b108712e2",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 7360,
        "wires": [
            [
                "ac9f9e9b400a446e",
                "affda0155d512861"
            ]
        ]
    },
    {
        "id": "0a5afd7ffeaae07e",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "00 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 7300,
        "wires": [
            [
                "7aa5e324b9de4d88",
                "83233f090e99f7c8"
            ]
        ]
    },
    {
        "id": "26b5d26c4cb8a634",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "00 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 700,
        "y": 7330,
        "wires": [
            [
                "7aa5e324b9de4d88",
                "83233f090e99f7c8"
            ]
        ]
    },
    {
        "id": "799be90848212ad7",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 750,
        "y": 7390,
        "wires": [
            [
                "ac9f9e9b400a446e",
                "affda0155d512861"
            ]
        ]
    },
    {
        "id": "dfb45d7ccd989c4c",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "W Eng ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"W_ENG\" && (power_meter === \"PM_200_1\" || power_meter === \"PM_200_2\")) {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 7270,
        "wires": [
            [
                "523dadcbb916f7ab"
            ]
        ]
    },
    {
        "id": "83233f090e99f7c8",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200 2",
        "func": "msg.topic = \"SELECT * FROM tb_total_kwh_pm200 WHERE power_meter = 'PM_200_2' ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 7330,
        "wires": [
            [
                "523dadcbb916f7ab"
            ]
        ]
    },
    {
        "id": "e255f7f8f12fc812",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data ",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        kwh: result.power_meter,\n        value: result.value\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1520,
        "y": 7270,
        "wires": [
            [
                "b6403d6f22b00175",
                "e45fc0eefbcb5b9d"
            ]
        ]
    },
    {
        "id": "b6403d6f22b00175",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift WEng 200 1",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM_200_1\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200_1 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1800,
        "y": 7270,
        "wires": [
            [
                "e6839d764c039c7e"
            ]
        ]
    },
    {
        "id": "e45fc0eefbcb5b9d",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "PerShift WEng 200 2",
        "func": "var payload = msg.payload;\nvar date_time = new Date(payload.date_time);\nvar power_meter = payload.kwh;\nvar value = payload.value;\nvar shift;\n\nvar currentHour = date_time.getHours();\nvar currentMinute = date_time.getMinutes();\nvar currentDay = date_time.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((date_time.getDate() - 1 - date_time.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = date_time.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = date_time.getFullYear();\n\nif (power_meter === \"PM_200_2\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_pershift_pm200_2 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1800,
        "y": 7300,
        "wires": [
            [
                "e6839d764c039c7e"
            ]
        ]
    },
    {
        "id": "6b95dcfe5d0f9064",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "consumption_energy_pershift",
        "func": "var payload_one = msg.payload[0];\nvar payload_two = msg.payload[1];\n\nvar idPrimary_one = payload_one.idPrimary;\nvar idPrimary_two = payload_two.idPrimary;\nvar power_meter_one = payload_one.power_meter;\nvar power_meter_two = payload_two.power_meter;\nvar value_one = payload_one.value;\nvar value_two = payload_two.value;\n\nvar consumption_energy = value_one - value_two;\n\n\nif (power_meter_one === \"PM_200_1\"){\n    msg.topic = `UPDATE tb_pershift_pm200_1 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}if(power_meter_one === \"PM_200_2\"){\n    msg.topic = `UPDATE tb_pershift_pm200_2 SET consumption_energy = '${consumption_energy}' WHERE idPrimary = '${idPrimary_two}';`;\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1770,
        "y": 7330,
        "wires": [
            [
                "e6839d764c039c7e"
            ]
        ]
    },
    {
        "id": "a881cb8b55b13b59",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Parse Data DP_QG_CT",
        "func": "\nif (msg.payload && msg.payload.length > 0) {\n    const result = msg.payload[0];\n    msg.parsedData = {\n        id: result.idPrimary,\n        date_time: result.date_time,\n        power_watt: result.power_watt,\n        energy_wh: result.energy_wh,\n        current_a: result.current_a,\n        voltage_v: result.voltage_v\n    };\n    msg.payload = msg.parsedData;\n} else {\n    msg.payload = { error: \"No data found\" };\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1560,
        "y": 7110,
        "wires": [
            []
        ]
    },
    {
        "id": "4f871656e7e96928",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query QG_CT",
        "func": "msg.topic = \"SELECT * FROM tb_panel_qg_ct WHERE panel = 'DP_QG_CT' ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 7140,
        "wires": [
            [
                "ee48c4a338b66f66"
            ]
        ]
    },
    {
        "id": "e6839d764c039c7e",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "4e8cb6578baa1850",
        "name": "",
        "x": 2060,
        "y": 7270,
        "wires": [
            []
        ]
    },
    {
        "id": "dc2b8e456706e740",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "4e8cb6578baa1850",
        "name": "",
        "x": 1300,
        "y": 7310,
        "wires": [
            [
                "6b95dcfe5d0f9064"
            ]
        ]
    },
    {
        "id": "affda0155d512861",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200 2",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200_2 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 7390,
        "wires": [
            [
                "dc2b8e456706e740"
            ]
        ]
    },
    {
        "id": "37204709ef91e98d",
        "type": "debug",
        "z": "47d2b4a4dc264f89",
        "name": "debug 4",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 380,
        "y": 440,
        "wires": []
    },
    {
        "id": "673dc9f11c44bf6a",
        "type": "mqtt in",
        "z": "47d2b4a4dc264f89",
        "name": "",
        "topic": "topic_coreengine_server",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "5aa7e47a49afb254",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 120,
        "y": 60,
        "wires": [
            [
                "a3f77b5ef95a3389",
                "37204709ef91e98d",
                "5df4cf7e07b96e30",
                "036a65c560549b2d",
                "2c2e7aad0636c220"
            ]
        ]
    },
    {
        "id": "dd4e44a6c2ff0c6d",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "PerDay",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 00 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 650,
        "y": 630,
        "wires": [
            []
        ]
    },
    {
        "id": "b6682940163158c9",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "16c3f1ddb8a5b3e2",
        "name": "",
        "x": 1260,
        "y": 2980,
        "wires": [
            []
        ]
    },
    {
        "id": "f1704b4a24932ba6",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Cam Cap No1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CC1\" && power_meter === \"PM 220\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 950,
        "y": 2980,
        "wires": [
            [
                "b6682940163158c9"
            ]
        ]
    },
    {
        "id": "63e29a3eeea64dfd",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Cam Cap No 1",
        "func": "\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CC1\" && power_meter === \"PM 200\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 950,
        "y": 3010,
        "wires": [
            [
                "b6682940163158c9"
            ]
        ]
    },
    {
        "id": "8ab2864aa87399e4",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 3040,
        "wires": [
            [
                "b6682940163158c9"
            ]
        ]
    },
    {
        "id": "6f38220139d7e3ce",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 3070,
        "wires": [
            [
                "b6682940163158c9"
            ]
        ]
    },
    {
        "id": "f4fb92da20a87fb6",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 3100,
        "wires": [
            [
                "f4482aa6edc99a0c"
            ]
        ]
    },
    {
        "id": "a28868fd27ff4caf",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 3130,
        "wires": [
            [
                "f4482aa6edc99a0c"
            ]
        ]
    },
    {
        "id": "c885fe8010176620",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 3100,
        "wires": [
            [
                "f4fb92da20a87fb6",
                "a28868fd27ff4caf"
            ]
        ]
    },
    {
        "id": "0627c947a5b02ac5",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 3040,
        "wires": [
            [
                "8ab2864aa87399e4",
                "6f38220139d7e3ce"
            ]
        ]
    },
    {
        "id": "6327266e543bea69",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 3070,
        "wires": [
            [
                "8ab2864aa87399e4",
                "6f38220139d7e3ce"
            ]
        ]
    },
    {
        "id": "24a68b87608aec6f",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 3130,
        "wires": [
            [
                "f4fb92da20a87fb6",
                "a28868fd27ff4caf"
            ]
        ]
    },
    {
        "id": "f4482aa6edc99a0c",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "16c3f1ddb8a5b3e2",
        "name": "",
        "x": 1260,
        "y": 3020,
        "wires": [
            []
        ]
    },
    {
        "id": "997284f841c6d086",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "fd2607531328f8e6",
        "name": "",
        "x": 1270,
        "y": 3190,
        "wires": [
            []
        ]
    },
    {
        "id": "46c33b74ae839be9",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Cam Cap No 234",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CC234\" && power_meter === \"PM_220V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm220 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 960,
        "y": 3190,
        "wires": [
            [
                "997284f841c6d086"
            ]
        ]
    },
    {
        "id": "7a0d0d04abce52dc",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Cam Cap No 234",
        "func": "\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"CC234\" && power_meter === \"PM_200V\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_total_kwh_pm200 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 960,
        "y": 3220,
        "wires": [
            [
                "997284f841c6d086"
            ]
        ]
    },
    {
        "id": "7d540a66dfcba85f",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm220 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 3250,
        "wires": [
            [
                "997284f841c6d086"
            ]
        ]
    },
    {
        "id": "057e30c12d9a8167",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Create SQL Query pm 200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_total_kwh_pm200 ORDER BY idPrimary DESC LIMIT 1\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 3280,
        "wires": [
            [
                "997284f841c6d086"
            ]
        ]
    },
    {
        "id": "3cd491bf626334f2",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm220",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm220 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 3310,
        "wires": [
            [
                "ca8fcae9389caffe"
            ]
        ]
    },
    {
        "id": "bf98088b3136c3dc",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "Query consumption pm200",
        "func": "\nmsg.topic = \"SELECT * FROM tb_pershift_pm200 ORDER BY idPrimary DESC LIMIT 2\";\nreturn msg;\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 3340,
        "wires": [
            [
                "ca8fcae9389caffe"
            ]
        ]
    },
    {
        "id": "e8a7c6da29c1b2fa",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 3310,
        "wires": [
            [
                "3cd491bf626334f2",
                "bf98088b3136c3dc"
            ]
        ]
    },
    {
        "id": "7db689d34287b17b",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 1 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 3250,
        "wires": [
            [
                "7d540a66dfcba85f",
                "057e30c12d9a8167"
            ]
        ]
    },
    {
        "id": "b94964f2a9ed2851",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 660,
        "y": 3280,
        "wires": [
            [
                "7d540a66dfcba85f",
                "057e30c12d9a8167"
            ]
        ]
    },
    {
        "id": "a9e1650a193c3a05",
        "type": "inject",
        "z": "47d2b4a4dc264f89",
        "name": "Shift 2 Start consumption",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "start_true",
        "payloadType": "str",
        "x": 710,
        "y": 3340,
        "wires": [
            [
                "3cd491bf626334f2",
                "bf98088b3136c3dc"
            ]
        ]
    },
    {
        "id": "ca8fcae9389caffe",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "fd2607531328f8e6",
        "name": "",
        "x": 1270,
        "y": 3230,
        "wires": [
            []
        ]
    },
    {
        "id": "5eef2b39e1171aa5",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "dc56ad4eb0f6eef7",
        "name": "",
        "x": 1140,
        "y": 60,
        "wires": [
            []
        ]
    },
    {
        "id": "7981a9eb15970128",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "6e2a71cd13bdf08b",
        "name": "",
        "x": 1130,
        "y": 110,
        "wires": [
            []
        ]
    },
    {
        "id": "036a65c560549b2d",
        "type": "string",
        "z": "47d2b4a4dc264f89",
        "name": "hikitori",
        "methods": [
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": "^"
                    },
                    {
                        "type": "num",
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 400,
        "y": 100,
        "wires": [
            [
                "5045bfb6fefdb082"
            ]
        ]
    },
    {
        "id": "5df4cf7e07b96e30",
        "type": "string",
        "z": "47d2b4a4dc264f89",
        "name": "montiv",
        "methods": [
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": ","
                    },
                    {
                        "type": "num",
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 400,
        "y": 60,
        "wires": [
            [
                "30a785f0c06dc5a3"
            ]
        ]
    },
    {
        "id": "30a785f0c06dc5a3",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "nais_produksi",
        "func": "// Fungsi mapping line_id ke line_name dan pg\nfunction getLineInfo(line_id) {\n    const lineMap = {\n        \"1\": { name: \"Common Rail 1\", pg: \"PG2.2\" },\n        \"2\": { name: \"Common Rail 2\", pg: \"PG2.2\" },\n        \"3\": { name: \"Common Rail 3\", pg: \"PG2.2\" },\n        \"4\": { name: \"Common Rail 4\", pg: \"PG2.1\" },\n        \"5\": { name: \"Common Rail 5\", pg: \"PG2.2\" },\n        \"6\": { name: \"Common Rail 6\", pg: \"PG2.1\" },\n        \"7\": { name: \"Common Rail 7\", pg: \"PG2.2\" },\n        \"8\": { name: \"Common Rail 8\", pg: \"PG2.2\" },\n        \"9\": { name: \"Common Rail 9\", pg: \"PG2.1\" },\n        \"10\": { name: \"Common Rail 10\", pg: \"PG2.1\" },\n        \"11\": { name: \"Common Rail 11\", pg: \"PG2.1\" },\n        \"12\": { name: \"Common Rail 12\", pg: \"PG2.3\" },\n        \"13\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"13A\": { name: \"Cam housing A\", pg: \"PG2.3\" },\n        \"13B\": { name: \"Cam housing B\", pg: \"PG2.3\" },\n        \"14\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"14A\": { name: \"Cam housing C\", pg: \"PG2.3\" },\n        \"14B\": { name: \"Cam housing D\", pg: \"PG2.3\" },\n        \"15\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"15A\": { name: \"Cam housing E NR\", pg: \"PG2.3\" },\n        \"15B\": { name: \"Cam housing E D05E\", pg: \"PG2.3\" },\n        \"16\": { name: \"Cam housing Assy A\", pg: \"PG2.3\" },\n        \"17\": { name: \"Cam housing Assy B\", pg: \"PG2.3\" },\n        \"18\": { name: \"Cam housing Assy\", pg: \"PG2.3\" },\n        \"18A\": { name: \"Cam housing Assy C NR\", pg: \"PG2.3\" },\n        \"18B\": { name: \"Cam housing Assy C D05E\", pg: \"PG2.3\" },\n        \"19\": { name: \"Cam Cap 1A\", pg: \"PG2.3\" },\n        \"20\": { name: \"Cam Cap 1B\", pg: \"PG2.3\" },\n        \"21\": { name: \"Cam Cap 1\", pg: \"PG2.3\" },\n        \"21A\": { name: \"Cam Cap 1C NR\", pg: \"PG2.3\" },\n        \"21B\": { name: \"Cam Cap 1C D05E\", pg: \"PG2.3\" },\n        \"22\": { name: \"Cam Cap 2\", pg: \"PG2.3\" },\n        \"22A\": { name: \"Cam Cap 2 2MP\", pg: \"PG2.3\" },\n        \"22B\": { name: \"Cam Cap 2 3MP\", pg: \"PG2.3\" },\n        \"22C\": { name: \"Cam Cap 2 4MP\", pg: \"PG2.3\" },\n        \"22D\": { name: \"Cam Cap 2 5MP\", pg: \"PG2.3\" },\n        \"23\": { name: \"Cam Cap 3\", pg: \"PG2.3\" },\n        \"23A\": { name: \"Cam Cap 3 2MP\", pg: \"PG2.3\" },\n        \"23B\": { name: \"Cam Cap 3 3MP\", pg: \"PG2.3\" },\n        \"23C\": { name: \"Cam Cap 3 4MP\", pg: \"PG2.3\" },\n        \"23D\": { name: \"Cam Cap 3 5MP\", pg: \"PG2.3\" },\n        \"24\": { name: \"Cam Cap 4\", pg: \"PG2.3\" },\n        \"24A\": { name: \"Cam Cap 4 2MP\", pg: \"PG2.3\" },\n        \"24B\": { name: \"Cam Cap 4 3MP\", pg: \"PG2.3\" },\n        \"24C\": { name: \"Cam Cap 4 4MP\", pg: \"PG2.3\" },\n        \"24D\": { name: \"Cam Cap 4 5MP\", pg: \"PG2.3\" },\n        \"25\": { name: \"Cam Cap 2 & 3 D05E\", pg: \"PG2.3\" },\n        \"26\": { name: \"Spacer Drive Gear\", pg: \"PG1.1\" },\n        \"26A\": { name: \"Retainer\", pg: \"PG1.1\" },\n        \"27\": { name: \"Connector\", pg: \"PG1.1\" },\n        \"27A\": { name: \"Retainer\", pg: \"PG1.1\" },\n        \"27B\": { name: \"Drive Gear\", pg: \"PG1.1\" },\n        \"27C\": { name: \"Spacer Drive Gear\", pg: \"PG1.1\" },\n        \"28\": { name: \"Housing\", pg: \"PG1.1\" },\n        \"28A\": { name: \"Housing Inlet TR\", pg: \"PG1.1\" },\n        \"28B\": { name: \"Housing Inlet D13E\", pg: \"PG1.1\" },\n        \"29\": { name: \"Balance Shaft NO 1\", pg: \"PG1.1\" },\n        \"29A\": { name: \"Balance Shaft NO 2\", pg: \"PG1.1\" },\n        \"30\": { name: \"Roller Arm 1\", pg: \"PG1.1\" },\n        \"30A\": { name: \"Roller Arm 1 A\", pg: \"PG1.1\" },\n        \"30B\": { name: \"Roller Arm 1 B\", pg: \"PG1.1\" },\n        \"30C\": { name: \"Roller Arm 1 C\", pg: \"PG1.1\" },\n        \"30D\": { name: \"Roller Arm 1 D\", pg: \"PG1.1\" },\n        \"30E\": { name: \"Roller Arm 1 E\", pg: \"PG1.1\" },\n        \"31\": { name: \"Roller Arm 2\", pg: \"PG1.1\" },\n        \"31A\": { name: \"Roller Arm 2 A\", pg: \"PG1.1\" },\n        \"31B\": { name: \"Roller Arm 2 B\", pg: \"PG1.1\" },\n        \"31C\": { name: \"Roller Arm 2 C\", pg: \"PG1.1\" },\n        \"31D\": { name: \"Roller Arm 2 D\", pg: \"PG1.1\" },\n        \"31E\": { name: \"Roller Arm 2 E\", pg: \"PG1.1\" },\n        \"32\": { name: \"Hydraulic Lash Adjuster\", pg: \"PG1.1\" },\n        \"32A\": { name: \"Hydraulic Lash Adjuster A\", pg: \"PG1.1\" },\n        \"32B\": { name: \"Hydraulic Lash Adjuster B\", pg: \"PG1.1\" },\n        \"32C\": { name: \"Hydraulic Lash Adjuster C\", pg: \"PG1.1\" },\n        \"32D\": { name: \"Hydraulic Lash Adjuster D\", pg: \"PG1.1\" },\n        \"32E\": { name: \"Hydraulic Lash Adjuster E\", pg: \"PG1.1\" },\n        \"33\": { name: \"Housing Inlet Water\", pg: \"PG1.1\" },\n        \"34\": { name: \"Packing Assy A\", pg: \"PG1.2\" },\n        \"35\": { name: \"Packing Assy B\", pg: \"PG1.2\" },\n        \"36\": { name: \"Packing Assy C\", pg: \"PG1.2\" },\n        \"37\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"38\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"39\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"40\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"41\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"42\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"43\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"44\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"45\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"46\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"47\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"48\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"49\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"50\": { name: \"Packing IMV\", pg: \"PG1.2\" }\n    };\n\n    return lineMap[line_id] || null;\n}\n\n// Fungsi untuk mengubah line_name jadi format tabel\nfunction toTableName(name) {\n    return name\n        .toLowerCase()\n        .replace(/[^a-z0-9 ]/g, '') // Hapus karakter aneh\n        .replace(/\\s+/g, '_');      // Ganti spasi jadi _\n}\n\n// Main logic\nconst payload = msg.payload;\n\nif (payload.length < 12) {\n    return null; // Data tidak lengkap\n}\n\nconst line_id = payload[0];\nconst info = getLineInfo(line_id);\n\nif (!info) {\n    return null; // Tidak ada info untuk line_id ini\n}\n\n// Ekstrak semua field dari payload\nconst [\n    , name_product, target, actual, loading_time, efficiency,\n    delay, cycle_time, status_montiv, time_trouble,\n    time_trouble_quality, andon\n] = payload;\n\n// Buat nama tabel dinamis\nconst tableName = toTableName(info.name); // e.g., \"cam_cap_2_2mp\"\n\n// Bangun query SQL untuk tabel spesifik line\nconst specificLineQuery = `\nINSERT INTO ${tableName} (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${info.pg}', '${info.name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\n// Bangun query SQL untuk tabel production_data\nconst productionDataQuery = `\nINSERT INTO production_data (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${info.pg}', '${info.name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\n// Gabungkan kedua query dengan pemisah titik koma\nmsg.topic = `${specificLineQuery}; ${productionDataQuery}`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 60,
        "wires": [
            [
                "5eef2b39e1171aa5"
            ]
        ]
    },
    {
        "id": "5045bfb6fefdb082",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "nais_hikitori",
        "func": "var name_hikitori = msg.payload[0];\nvar actual_pouling  = msg.payload[1];\nvar loading_time    = msg.payload[2];\nvar status          = msg.payload[3];\nvar cycle_normal    = msg.payload[4];\nvar andon           = msg.payload[5];\n\nvar validHikitoriIds = [\n    \"HIKITORI A\", \"HIKITORI B\", \"HIKITORI C\", \"HIKITORI D\",\n    \"HIKITORI E\", \"HIKITORI F\", \"HIKITORI G\", \"HIKITORI H\"\n];\n\n// Cek apakah name_hikitori valid\nif (validHikitoriIds.includes(name_hikitori)) {\n\n    // Masukkan ke tabel umum hikitori_data\n    var commonQuery =\n        `INSERT INTO hikitori_data \n        (id, name_hikitori, actual_pouling, loading_time, status, cycle_normal, andon)\n         VALUES \n        (NULL, '${name_hikitori}', '${actual_pouling}', '${loading_time}', '${status}', '${cycle_normal}', '${andon}');`;\n\n    return { topic: commonQuery };\n    \n} else {\n    // Jika tidak valid, tidak kirim apa-apa\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 800,
        "y": 100,
        "wires": [
            [
                "7981a9eb15970128"
            ]
        ]
    },
    {
        "id": "b9687376864bee7b",
        "type": "mysql",
        "z": "47d2b4a4dc264f89",
        "mydb": "1b0b8697b910c046",
        "name": "",
        "x": 1130,
        "y": 160,
        "wires": [
            []
        ]
    },
    {
        "id": "a1e88bb2e00a64d9",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "nais_energy",
        "func": "// Ambil payload\nvar panel = msg.payload[0];       // contoh: \"CR_7\"\nvar powerMeter = msg.payload[1];  // contoh: \"PM-220V\"\nvar value = msg.payload[2];       // nilai input\n\n// Validasi input dasar\nif (!panel || !powerMeter || !value) {\n    // node.warn(\"Input tidak lengkap\");\n    return null;\n}\n\n// Waktu saat ini\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\n\n// Tentukan shift berdasarkan jam\nvar shift;\nif ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n    (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n    shift = \"shift_1\";\n} else {\n    shift = \"shift_2\";\n}\n\n// Hitung minggu dalam bulan\nfunction getWeekNumber(date) {\n    const year = date.getFullYear();\n    const month = date.getMonth();\n    const firstDayOfMonth = new Date(year, month, 1);\n    const timeDiff = date.getTime() - firstDayOfMonth.getTime();\n    const pastDaysOfYear = Math.floor(timeDiff / (1000 * 60 * 60 * 24));\n    return Math.ceil((pastDaysOfYear + firstDayOfMonth.getDay() + 1) / 7);\n}\n\nvar currentDay = now.getDate(); // 1 - 31\nvar currentMonthName = now.toLocaleString('default', { month: 'long' }); // e.g., \"January\"\nvar currentYear = now.getFullYear();\nvar currentWeek = getWeekNumber(now);\n\n// Cari nama tabel dinamis\nfunction getTableName(panel, powerMeter) {\n    var pmKey;\n    var panelCode;\n\n    // Khusus untuk DPCH\n    if (panel === \"DPCH\") {\n        if (powerMeter === \"PM-200V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM-220V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null; // powerMeter tidak dikenali\n        }\n        panelCode = \"chab\"; // mapping tetap ke chab\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n    // Khusus untuk DPCH-CD\n    if (panel === \"DPCH-CD\") {\n        if (powerMeter === \"PM-1F\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM-3F\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n        panelCode = \"chcd\"; // mapping tetap ke chcd\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n    // Normalisasi powerMeter\n    switch (powerMeter) {\n        case \"PM 200\":\n        case \"PM_200\":\n        case \"PM_200V\":\n        case \"PM-200V\":\n            pmKey = \"pm200\";\n            break;\n        case \"PM 220\":\n        case \"PM_220V\":\n        case \"PM-220V\":\n        case \"PM_220\":\n            pmKey = \"pm220\";\n            break;\n        default:\n            return null;\n    }\n\n    // Normalisasi panel code\n    switch (panel) {\n        case \"roller_arm\":   panelCode = \"ra\";       break;\n        case \"HLA\":          panelCode = \"hla\";      break;\n        case \"BS_1\":         panelCode = \"bs1\";      break;\n        case \"BS_2\":         panelCode = \"bs2\";      break;\n        case \"CH_SAA\":       panelCode = \"chsaa\";    break;\n        case \"CH_SAB\":       panelCode = \"chsab\";    break;\n        case \"CH_SAC\":       panelCode = \"chsac\";   break;\n        case \"CH_EF\":        panelCode = \"chef\";      break;\n        case \"RET\":          panelCode = \"ret\";      break;\n        case \"CONN\":         panelCode = \"conn\";    break;\n        case \"CR_1\":         panelCode = \"cr1\";     break;\n        case \"CR_2\":         panelCode = \"cr2\";     break;\n        case \"CR_3\":         panelCode = \"cr3\";     break;\n        case \"CR_4\":         panelCode = \"cr4\";     break;\n        case \"CR_5\":         panelCode = \"cr5\";     break;\n        case \"CR_6\":         panelCode = \"cr6\";     break;\n        case \"CR_7\":         panelCode = \"cr7\";     break;\n        case \"CR_8\":         panelCode = \"cr8\";     break;\n        case \"CR_9\":         panelCode = \"cr9\";     break;\n        case \"CR_10\":        panelCode = \"cr10\";    break;\n        case \"CR_11\":        panelCode = \"cr11\";    break;\n        case \"CR_12\":        panelCode = \"cr12\";    break;\n        case \"CAM_CAP_1\":    panelCode = \"cc1\";     break;\n\n        case \"W_ENG\":    panelCode = \"weng\";        break;\n\n\n        default:\n            // node.warn(\"Panel tidak dikenali: \" + panel);\n            return null;\n    }\n\n    return \"tb_\" + pmKey + \"_\" + panelCode;\n}\n\n// Dapatkan nama tabel tujuan\nvar tableName = getTableName(panel, powerMeter);\n\nif (!tableName) {\n    // node.warn(\"Tidak ada tabel ditemukan untuk panel: \" + panel + \" dan power meter: \" + powerMeter);\n    return null;\n}\n\n// Buat query SQL\nmsg.topic = `INSERT INTO ${tableName} (power_meter, value, shift, day, week, month, year)\n             VALUES ('${powerMeter}', '${value}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonthName}', '${currentYear}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 850,
        "y": 140,
        "wires": [
            [
                "b9687376864bee7b"
            ]
        ]
    },
    {
        "id": "2c2e7aad0636c220",
        "type": "string",
        "z": "47d2b4a4dc264f89",
        "name": "energy",
        "methods": [
            {
                "name": "strip",
                "params": [
                    {
                        "type": "str",
                        "value": "\\n"
                    }
                ]
            },
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            },
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": ","
                    },
                    {
                        "type": "num",
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 400,
        "y": 140,
        "wires": [
            [
                "a1e88bb2e00a64d9",
                "34f1a48496f54365"
            ]
        ]
    },
    {
        "id": "34f1a48496f54365",
        "type": "function",
        "z": "47d2b4a4dc264f89",
        "name": "filter_pm1200",
        "func": "var panel = msg.payload[1];\nvar powerMeter = msg.payload[2];\nvar value = msg.payload[3];\n\nvar panel_nais;\nvar powerMeter_nais;\nvar value_nais;\nvar msg_nais;\n\n\nif ([\"HLA\", \"DPCH\", \"DPCH-CD\", \"CH_SAA\", \"CH_SAB\", \"CH_SAC\", \"CH_EF\", \"RET\", \"CAM_CAP_1\"].includes(panel)) {\n    panel_nais = panel;\n    powerMeter_nais = powerMeter;\n    value_nais = value;\n\n    msg_nais = \"*\" + panel_nais + \",\" + powerMeter_nais + \",\" + value_nais + \",#\";\n    return { payload: msg_nais }; // Jika di Node-RED, biasanya kirim dalam objek\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 530,
        "y": 270,
        "wires": [
            [
                "8d1448f6f6bc6d1a",
                "18b8d2537846667b"
            ]
        ]
    },
    {
        "id": "8d1448f6f6bc6d1a",
        "type": "debug",
        "z": "47d2b4a4dc264f89",
        "name": "debug 5",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 910,
        "y": 230,
        "wires": []
    },
    {
        "id": "18b8d2537846667b",
        "type": "string",
        "z": "47d2b4a4dc264f89",
        "name": "energy",
        "methods": [
            {
                "name": "strip",
                "params": [
                    {
                        "type": "str",
                        "value": "\\n"
                    }
                ]
            },
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            },
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": ","
                    },
                    {
                        "type": "num",
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 670,
        "y": 200,
        "wires": [
            [
                "a1e88bb2e00a64d9"
            ]
        ]
    },
    {
        "id": "0361114a2e71409f",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_roller_arm",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "5c6b32f70a43ca93",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_1",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "407b212ddb1acfdb",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_2",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "41f68b19c3246d8a",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_3",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "642430a0b7a904a3",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_4",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "7f85a7eee76817e0",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_5",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "e9b109274bd299cd",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_6",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "61c7b5303d27909b",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_7",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "956813c6441ba02d",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_10",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "8e1abcde75d29c6e",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_8",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "cb5678987898cbfe",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_9",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "5d16b75c2c713543",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_11",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "a6d6def47310eb39",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_common_rail_12",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "6d1653ba238d6863",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_balance_shaft_1",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "6b4525fbd18bd30e",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_balance_shaft_2",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "77b10ec0f7b97c95",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_camphousing_ab",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "80575a721b4e8402",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_camphousing_cd",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "5ece4c8e9f4698c2",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_retainer",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "3a0fa0589f998305",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_camphousing_ef",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "26965381d907279f",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_camphousing_sac",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "18e94f3dd27470fb",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_lpf3",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "66bbdf3188c2f96b",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_area_compressor",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "dac028631c98c7b8",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_qg_ct",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "324cafcc29429c41",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_camphousing_saa",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "ede383246ecefa61",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_camphousing_sab",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "fa18e28dc611e6be",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_connector",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "9812f06702c58bdc",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_hla",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "4e8cb6578baa1850",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_energy_w_enginering",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "5aa7e47a49afb254",
        "type": "mqtt-broker",
        "name": "",
        "broker": "10.42.0.17",
        "port": "1883",
        "clientid": "",
        "autoConnect": true,
        "usetls": false,
        "protocolVersion": "4",
        "keepalive": "60",
        "cleansession": true,
        "autoUnsubscribe": true,
        "birthTopic": "",
        "birthQos": "0",
        "birthRetain": "false",
        "birthPayload": "",
        "birthMsg": {},
        "closeTopic": "",
        "closeQos": "0",
        "closeRetain": "false",
        "closePayload": "",
        "closeMsg": {},
        "willTopic": "",
        "willQos": "0",
        "willRetain": "false",
        "willPayload": "",
        "willMsg": {},
        "userProps": "",
        "sessionExpiry": ""
    },
    {
        "id": "16c3f1ddb8a5b3e2",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_cam_cap_1",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "fd2607531328f8e6",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "db_cam_cap_234",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "dc56ad4eb0f6eef7",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_produksi",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "6e2a71cd13bdf08b",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_himos",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "1b0b8697b910c046",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_energy",
        "tz": "",
        "charset": "UTF8"
    }
]
