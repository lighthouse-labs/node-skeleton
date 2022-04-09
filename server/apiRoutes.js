module.exports = function(router, database) {

  router.get('/', (req, res) => {
    database.getAllListings(req.query, 10)
      .then(listings => res.send({listings}))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  // router.get('/reservations', (req, res) => {
  //   const userId = req.session.userId;
  //   if (!userId) {
  //     res.error("💩");
  //     return;
  //   }
  //   database.getAllReservations(userId)
  //     .then(reservations => res.send({reservations}))
  //     .catch(e => {
  //       console.error(e);
  //       res.send(e);
  //     });
  // });

  // router.post('/properties', (req, res) => {
  //   const userId = req.session.userId;
  //   database.addProperty({...req.body, owner_id: userId})
  //     .then(property => {
  //       res.send(property);
  //     })
  //     .catch(e => {
  //       console.error(e);
  //       res.send(e);
  //     });
  // });

  return router;
};
