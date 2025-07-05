// create anonymous Id to be saved in localstorage
export function getAnonymousId() {
  let id = localStorage.getItem("anonymousUserId");
  if (!id) {
    id = crypto.randomUUID(); // works in all modern browsers
    localStorage.setItem("anonymousUserId", id);
  }
  return id;
}
