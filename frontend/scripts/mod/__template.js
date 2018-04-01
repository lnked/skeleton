((d) => {
  window.template = (id, data) => {
    if (d.getElementById(id) !== null) {
      return d.getElementById(id).innerHTML;
    }
    return '';
  };
})(document);
