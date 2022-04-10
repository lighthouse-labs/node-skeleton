module.exports = function(router, database) {

  router.get('/', (req, res) => {
    database.getAllListings(req.query, 10)
      .then(listings => res.send({listings}))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });


  router.post('/', (req, res) => {
    const userId = req.session.userId;
    database.addListing({})
      .then(listing => {
        res.send(listing);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};
