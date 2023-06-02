export const preventSymbol = (value) => {
   return value.replace(/[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi, "");
}

export const getFormatTime = (date) => {
   let hh = date.getHours();
   hh = hh >= 10 ? hh : '0' + hh;
   let mm = date.getMinutes();
   mm = mm >= 10 ? mm : '0' + mm;
   let ss = date.getSeconds();
   ss = ss >= 10 ? ss : '0' + ss;
   return '' + hh + mm + ss; 
}