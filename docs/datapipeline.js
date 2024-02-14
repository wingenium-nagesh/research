function init_data_pipe(t, e, n = !1) {
  let a = n && n.file_type ? n.file_type.toLowerCase() : "json",
    i = !!n && !!n.debug,
    o = window.location.search,
    s = new URLSearchParams(o),
    r = n && n.params ? n.params : {},
    l = Date.now().toString(16) + Math.floor(1e4 * Math.random()).toString(16);
  var d = t.getGlobal();
  (d.sessionId = l),
    fetch(
      "https://psych-studies.com/datapipe/" +
        (i ? "debug/" : "") +
        e
          .split("")
          .map((t) => t.charCodeAt(0))
          .reduce((t, e) => (t + ((t << 7) + (t << 3))) ^ e)
          .toString(16)
    ),
    t.addSettings("logger", {
      onRow: function (e, n, a, i) {
        if (e === t.script.name) {
          (i.logs = []), (i.type = "anonymous manager");
          return;
        }
        for (let o of ((i.type = "task"), (n.sessionId = l), s.keys()))
          n[o] = s.get(o);
        for (let d in r) n[d] = r[d];
        i.logs || (i.logs = []), i.logs.push(n);
      },
      onEnd: function (t, e, n) {
        return n.logs;
      },
      serialize: function (t, e, n, a) {
        return e;
      },
      send: function (n, i, o, s) {
        let r = "";
        if (
          ("csv" === a && (r = toCsv(pivot(i))),
          "tsv" === a && (r = toCsv(pivot(i), "	")),
          "json" === a && (r = JSON.stringify(i)),
          r && "task" === s.type && n !== t.script.name)
        )
          return (
            (d.sent = !1),
            fetch("https://pipe.jspsych.org/api/data/", {
              method: "POST",
              headers: { "Content-Type": "application/json", Accept: "*/*" },
              body: JSON.stringify({
                experimentID: e,
                filename: n + "_" + l + "." + a,
                data: r,
              }),
            }).then(() => {
              d.sent = !0;
            })
          );
      },
    });
}
function pivot(t) {
  var e = new Map(),
    n = t.map((t) =>
      (function t(n, a, i) {
        if (Object(i) !== i) {
          var o = a.join(".");
          n[(e.has(o) ? e : e.set(o, e.size)).get(o)] = i;
        } else for (var s in i) t(n, "0" == s ? a : a.concat(s), i[s]);
        return n;
      })([], [], t)
    );
  return [[...e.keys()], ...n];
}
function toCsv(t, e = ",") {
  return t
    .map((t) => t.map((t) => (isNaN(t) ? JSON.stringify(t) : +t)).join(e))
    .join("\n");
}
function generate_uploading_text(t, e, n) {
  return (
    "<%    wait4data();   function wait4data() {        if (document.getElementById('next_but') !== null && (global.sent === undefined || global.sent))            {return " +
    !!n +
    " ? document.getElementById('next_but').disabled = false :  document.getElementById('next_but').click();}        setTimeout(wait4data, 500);   }%>" +
    (t
      ? "<div class='panel panel-info' style='margin-top:1em'>	<div class='panel-heading'>		<h1 class='panel-title' style='font-size:2em'>" +
        t +
        "        </h1></div>"
      : "") +
    (e ? "<div class='panel-body'>    <p class='lead'>" + e + "</p>" : "") +
    ("<div class='text-center proceed' " +
      (n ? "" : "hidden") +
      "  style='margin: 30px auto 10px;'><button pi-message-done type='button' " +
      (n ? "disabled" : "") +
      " id = 'next_but' class='btn btn-primary'>") +
    n +
    "</button></div>"
  );
}
function uploading_task(t = !1) {
  let e = t && t.name ? t.name : "",
    n = t && t.title ? t.title : "",
    a = t && t.header ? t.header : "",
    i = t && t.body ? t.body : "",
    o = t && t.buttonText ? t.buttonText : "";
  return [
    {
      template: generate_uploading_text(a, i, o),
      title: n,
      name: e,
      type: "message",
    },
  ];
}
