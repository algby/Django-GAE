from application.models.datastore.post_model import *
from application.models.datastore.user_model import *
from application.models.dto.page_list import *


class PostService(object):
    def get_posts(self, index, size):
        """
        Get posts.
        :param index: {int} The page index.
        :param size: {int} The page size.
        :return: PageList(PostModel)
        """
        posts = PostModel().all().order('create_time').fetch(size, index * size)
        total = PostModel().all().count()
        return PageList(index, size, total, posts)

    def add_post(self, user_id, title, content):
        """
        Add a post.
        :param user_id: {long} The user id.
        :param title: The post title.
        :param content: The post content.
        :return: PostModel
        """
        # fetch author
        user = UserModel().get_by_id(user_id)

        post = PostModel()
        post.author = user
        post.title = title
        post.content = content
        post.put()
        post.get(post.key())
        return post
