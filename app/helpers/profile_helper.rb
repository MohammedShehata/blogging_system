module ProfileHelper
    DEFAULT_IMG = "default_1.jpg"
    def profile_pic user
      img = user.image_url(:thumb)
      return img.nil? ?  DEFAULT_IMG : img.to_s
    end
end
