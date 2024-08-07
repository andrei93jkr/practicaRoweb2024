<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasTimestamps;

    public function images(): HasMany
    {
        return $this->HasMany(related: ProductImage::class);
    }
}
