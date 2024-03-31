// let application = {
//     id:1,
//     user:1,
//     job:1,
//     resume:'link'
// }
let applications = [];
export const newApplicationId = () => {
  return applications.length + 1;
};
export const createNewApplication = (application) => {
  const alreadyApplied = applications.find(
    (e) => e.jobId == application.jobId && e.userId == application.userId
  );
  if (alreadyApplied) {
    return null;
  }
  application.id = newApplicationId();
  applications.push(application);
  return application;
};
export function getApplicationByUserId(userId) {
  return applications.filter((e) => e.userId == userId);
}
export function getApplicationByJobId(jobId) {
  return applications.filter((e) => e.jobId == jobId);
}
export function getApplicationById(id) {
  return applications.filter((e) => e.id == id);
}
export function getAppliedJobIdsByUser(userId) {
  return applications.flatMap((e) => {
    if (e.userId == userId) {
      return [e.jobId];
    } else {
      return [];
    }
  });
}
