const express = require("express");
const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const [posts] = await db.query(
    "SELECT p.*,a.name AS author_name FROM posts p join authors a where p.author_id = a.id"
  );
  res.render("posts-list", { posts });
});

router.get("/new-post", async function (req, res) {
  const [authors] = await db.query("SELECT * FROM authors");
  res.render("create-post", { authors });
});

router.post("/posts", async function (req, res) {
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];

  const result = await db.query(
    "insert into posts(title,summary,body,author_id) values(?)",
    [data]
  );
  res.redirect("/posts");
});

router.get("/posts/:id", async function (req, res) {
  const query = `select p.*,a.name AS author_name, a.email AS author_email from posts p join authors a
   on p.author_id =a.id  where p.id=?`;
  const [posts] = await db.query(query, req.params.id);
  if (!posts || posts.length === 0) {
    return res.status(404).render("404");
  }

  const post = {
    ...posts[0],
    date: posts[0].date.toISOString(),
    humanRedDate: posts[0].date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
  res.render("post-detail", { post: post });
});

router.get("/posts/:id/edit", async function (req, res) {
  const query = `select p.*,a.name AS author_name, a.email AS author_email from posts p join authors a
  on p.author_id =a.id  where p.id=?`;
  const [posts] = await db.query(query, req.params.id);
  if (!posts || posts.length === 0) {
    return res.status(404).render("404");
  }
  res.render("update-post", { post: posts[0] });
});

router.post("/posts/:id/edit", async function (req, res) {
  const query = `UPDATE posts  SET title=?,summary=?,body=? where id=?`;
  await db.query(query, [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.params.id,
  ]);

  res.redirect("/posts");
});

router.post("/posts/:id/delete", async function (req, res) {
  const query = "delete from posts where posts.id=?";
  await db.query(query, [req.params.id]);
  res.redirect("/posts");
});

module.exports = router;
