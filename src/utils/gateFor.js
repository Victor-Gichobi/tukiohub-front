function gateFor(id = "") {
  let hash = 0;

  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }

  return String(hash % 90 + 10);
}

export default gateFor;