export default function routes(app, addon) {
    // Redirect root path to /atlassian-connect.json,
    // which will be served by atlassian-connect-express.
    app.get('/', (req, res) => {
        res.redirect('/atlassian-connect.json');
    });

    app.get('/worklogs-migrator', addon.authenticate(), (req, res) => {
        if (!req.context.userAccountId) res.render('unauthorized');
        // Rendering a template is easy; the render method takes two params: the name of the component or template file, and its props.
        // Handlebars and jsx are both supported, but please note that jsx changes require `npm run watch-jsx` in order to be picked up by the server.
        res.render(
          'index.jsx', // change this to 'hello-world.jsx' to use the Atlaskit & React version
          {
            title: 'Worklogs Migrator',
            browserOnly: true
            //, issueId: req.query['issueId']
            //, browserOnly: true // you can set this to disable server-side rendering for react views
          }
        );
    });
}
