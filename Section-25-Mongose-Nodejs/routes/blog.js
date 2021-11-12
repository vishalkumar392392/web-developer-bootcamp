const express = require("express");
const db = require("../db/database");
const router = express.Router();
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const posts = await db.getDb().collection("posts").find().toArray();
  res.render("posts-list", { posts });
});

router.get("/posts/:id", async function (req, res) {
  const post = await db
    .getDb()
    .collection("posts")
    .findOne({ _id: new ObjectId(req.params.id) });
  if (!post) {
    return res.status(404).render("404");
  }

  post.humanReadableDate = post.date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  post.date = post.date.toISOString();
  res.render("post-detail", { post });
});

router.post("/posts", async function (req, res) {
  const authorId = new ObjectId(req.body.author.trim());
  const author = await db
    .getDb()
    .collection("authors")
    .findOne({ _id: authorId });

  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: authorId,
      name: author.name,
      email: author.email,
    },
  };

  const result = await db.getDb().collection("posts").insertOne(newPost);
  res.redirect("/posts");
});

router.get("/new-post", async function (req, res) {
  const authors = await db.getDb().collection("authors").find().toArray();
  res.render("create-post", { authors });
});

router.get("/posts/:id/edit", async function (req, res) {
  const post = await db
    .getDb()
    .collection("posts")
    .findOne({ _id: new ObjectId(req.params.id) });
  if (!post) {
    return res.status(404).render("404");
  }

  res.render("update-post", { post });
});

router.post("/posts/:id/edit", async function (req, res) {
  await db
    .getDb()
    .collection("posts")
    .updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          title: req.body.title,
          summary: req.body.summary,
          body: req.body.content,
        },
      }
    );
  res.redirect("/posts");
});

router.post("/posts/:id/delete", async function (req, res) {
  await db
    .getDb()
    .collection("posts")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.redirect("/posts");
});

module.exports = router;
