function checkphone(phone) {
  let rule = /^1[34578]\d{9}$/;
  return rule.test(phone)
}
function checkpwd(pwd) {
  return pwd.length >= 6
}
function checksame(pwd, samepwd) {
  return pwd == samepwd
}

export {
  checkphone,
  checkpwd,
  checksame
}
