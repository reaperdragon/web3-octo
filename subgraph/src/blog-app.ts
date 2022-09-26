import {
  BlogCreated as BlogCreatedEvent,
  BlogUpdated as BlogUpdatedEvent,
} from "../generated/BlogApp/BlogApp";
import { Blog } from "../generated/schema";

export function handleBlogCreated(event: BlogCreatedEvent): void {
  let blog = new Blog(event.params.blogId.toString());
  blog.blogcoverhash = event.params.blogcoverhash;
  blog.blogtitle = event.params.blogtitle;
  blog.blogcontent = event.params.blogcontent;
  blog.category = event.params.category;
  blog.date = event.params.date;
  blog.user = event.params.user;
  blog.createdAt = event.block.timestamp;
  blog.updatedAt = event.block.timestamp;
  blog.save();
}

export function handleBlogUpdated(event: BlogUpdatedEvent): void {
  let blog = Blog.load(event.params.blogId.toString());
  if (blog) {
    blog.blogcoverhash = event.params.blogcoverhash;
    blog.blogtitle = event.params.blogtitle;
    blog.blogcontent = event.params.blogcontent;
    blog.category = event.params.category;
    blog.date = event.params.date;
    blog.user = event.params.user;
    blog.updatedAt = event.block.timestamp;
    blog.save();
  }
}
