async function applyJob(event, jobId, userid) {
  event.preventDefault();
  if (!userid) {
    return alert("You're not logged in. login first to apply");
  }
  localStorage.setItem("jobId", jobId + "");
  window.location.href = "http://localhost:3000/api/jobs/apply/get_apply";
  return;
}
const deleteJobPost = async (id) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    };
    const url = "http://localhost:3000/api/jobs/" + id;
    console.log("==", url);
    const response = await fetch(url, options);
    alert("Deleted successfully");

    window.location.href = `http://localhost:3000/api/user/recruiter`;
  } catch (error) {
    console.log("error in delete ==>", error);
  }
};
