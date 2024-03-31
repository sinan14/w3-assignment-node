let jobs = [
  {
    id: 1,
    title: "Web Developer",
    company: "ABC Tech",
    location: "India",
    description: "Good Web Developer",
    createdBy: 2,
  },
  {
    id: 2,
    title: "Graphic Designer",
    company: "XYZ Design",
    location: "India",
    description: "Good Graphic Designer",
    createdBy: 2,
  },
];
export const addJobs = (job, createdBy) => {
  const { title, company, location, description } = job;
  const isJobExist = jobs.includes(
    (job) => title === job.title && job.company === company
  );
  if (isJobExist) return false;
  const newJob = {
    title,
    company,
    location,
    description,
    id: jobs.length + 1,
    createdBy,
  };
  jobs.push(newJob);
  return jobs;
};
export const getJobs = () => {
  return jobs;
};
export const removeJob = (id) => {
  jobs = jobs.filter((job) => job.id != id);
};
export const updateJob = (job) => {
  const index = jobs.findIndex((e) => e.id == job.id);
  if (index === -1) return null;
  jobs[index] = {
    ...jobs[index],
    ...job,
  };
};
export const getJob = (jobId) => {
  return jobs.find(({ id }) => id == jobId);
};
