<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comment;
use App\Models\Post;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Fetch all posts
        $posts = Post::all();

        //Loop through each post and create comments for each
        $posts->each(function ($post) {
            Comment::factory()->count(5)->create([
                'post_id' => $post->id,
            ]);
        });
    }
}
