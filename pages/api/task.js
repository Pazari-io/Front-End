// another magical one
// calls server every 5 seconds to get status till watermarking  / encryption is done

export default async function handler(req, res) {
  let TaskID = req.query.taskID;

  if (TaskID != '') {
    async function getStatus(TaskID) {
      const res = await fetch(process.env.PAZARI_ENGINE_ENDPOINT + '/auth/task?taskID=' + TaskID, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + process.env.PAZARI_ENGINE_API_KEY
        }
      });
      let json = await res.json();
      if (json.status === 'processing') console.log('not yet');
      if (json.status === 'done') return 'done';
    }
    const asyncInterval = async (callback, ms, taskID = TaskID) => {
      return new Promise((resolve) => {
        const interval = setInterval(async () => {
          if (await callback(taskID)) {
            resolve();
            clearInterval(interval);
          }
        }, ms);
      });
    };

    const caller = async () => {
      await asyncInterval(getStatus, 5000);
    };
    caller();

    return res.status(200).json({ status: 'done' });
  }

  return res.status(200);
}
