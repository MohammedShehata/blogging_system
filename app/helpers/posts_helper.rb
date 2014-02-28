module PostsHelper
  
  def format_date(post)
    post.published_at != nil ? post.published_at.strftime("%D %H:%M") : "Not Published Yet"
  end
  
  def format_utf_8(str)
    # new_str = str[0..i].force_encoding('UTF-8')
    # while (new_str.encoding.name != "UTF-8") and (i < str.length) do
    i = 0
    new_str = ""
    while i < str.length and i < 25 do
      if str[i].ascii_only?           # For English
        new_str += str[i]
        i += 1
      else                              # For Arabic if japansese we must add by 3
        new_str += str[i..(i+1)]
        i += 2
      end
    end
    
    return new_str
  end
  
end
