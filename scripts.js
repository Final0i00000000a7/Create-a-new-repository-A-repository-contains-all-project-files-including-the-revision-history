function getGDP(num) {
  num = E(num)
  t = num.sub(299).log10().add(1)
  y = E(1.03).add(t.mul(num.sub(299)).div(1e4)).pow(E(300).add(t.mul(num.sub(299))))
  z = {
    y: y,
    t: t,
  }
  return z
}
x = E(300)
function update() {
  window.GDP = getGDP(window.x).y
  window.t = getGDP(window.x).t
  window.nextGDP = getGDP(window.x.add(1)).y
  const xValue = document.getElementById('xValue');
  if (!E(xValue.value).isneg() || !E(xValue.value).isNaN()) x = E(xValue.value)
  const a = getUndulatingColor()
  const displays = document.getElementById('displays')
  displays.innerHTML = 'GDP = (1.03+t(x-299)/10000)<sup>(300+t(x-299))</sup> = '+colorText('h3',a,format(GDP))+`元，下次评论后`+colorText('h3',a,'×'+format(nextGDP.div(GDP)))+'<br>t = log<sub>10</sub>(x-299)+1 = '+colorText('h3',a,format(t))
}
function convertToB16(n) {
  let codes = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
  let x = n % 16
  return codes[(n - x) / 16] + codes[x]
}

function getUndulatingColor(period = Math.sqrt(760)) {
  let t = new Date().getTime()
  let a = Math.sin(t / 1e3 / period * 2 * Math.PI + 0)
  let b = Math.sin(t / 1e3 / period * 2 * Math.PI + 2)
  let c = Math.sin(t / 1e3 / period * 2 * Math.PI + 4)
  a = convertToB16(Math.floor(a * 128) + 128)
  b = convertToB16(Math.floor(b * 128) + 128)
  c = convertToB16(Math.floor(c * 128) + 128)
  return "#" + String(a) + String(b) + String(c)
}

function colorText(elem, color, text) {
  return "<" + elem + " style='color:" + color + ";text-shadow:0px 0px 10px;'>" + text + "</" + elem + ">"
}
function evaluateExpression(expression) {  
    try {  
        document.getElementById('xValue').value = eval(expression);  
    } catch (error) {
        return;  
    }  
}
setInterval(update)