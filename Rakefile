require 'rubygems'
require 'jekyll'

# Change your GitHub reponame
GITHUB_REPONAME = "Meroje/meroje.github.com"

namespace :site do
  desc "Generate blog files"
  task :generate do
    Jekyll::Site.new(Jekyll.configuration({
      "source"      => ".",
      "destination" => "_site"
    })).process
  end


  desc "Generate and publish blog to master"
  task :publish => [:generate] do
    require 'tmpdir'
    Dir.mktmpdir do |tmp|
      cp_r "_site/.", tmp
      Dir.chdir tmp
      system "git init"
      system "git add ."
      message = "Site updated at #{Time.now.utc}"
      system "git commit -m #{message.shellescape}"
      system "git remote add origin git@github.com:#{GITHUB_REPONAME}.git"
      system "git push origin master --force"
      FileUtils.remove_entry_secure tmp
    end
  end
end
