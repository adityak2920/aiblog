
var documents = [{
    "id": 0,
    "url": "https://adityak2920.github.io/404.html",
    "title": "",
    "body": " 404 Page not found :(  The requested page could not be found. "
    }, {
    "id": 1,
    "url": "https://adityak2920.github.io/about/",
    "title": "About Me",
    "body": " My name is Aditya Kumar. I am a 3rd year undegraduate engineering student in Electronics and Communication Engineering from USICT(GGSIPU), New Delhi. My main competencies are Deep Learning, Computer Vision and Machine Learning. "
    }, {
    "id": 2,
    "url": "https://adityak2920.github.io/categories/",
    "title": "Tags",
    "body": "Contents: {% if site. categories. size &gt; 0 %} {% for category in site. categories %} {% capture category_name %}{{ category | first }}{% endcapture %} {{ category_name }}{% endfor %}{% endif %} {% for category in site. categories %}  {% capture category_name %}{{ category | first }}{% endcapture %} &lt;h3 id = {{ category_name }} &gt;&lt;i class= fas fa-tags category-tags-icon &gt;&lt;/i&gt;&lt;/i&gt; {{ category_name }}&lt;/h3&gt;&lt;a name= {{ category_name | slugize }} &gt;&lt;/a&gt;{% for post in site. categories[category_name] %}{%- assign date_format = site. minima. date_format | default:  %b %-d, %Y  -%}&lt;article class= archive-item &gt; &lt;p class= post-meta post-meta-title &gt;&lt;a class= page-meta  href= {{ site. baseurl }}{{ post. url }} &gt;{{post. title}}&lt;/a&gt; • {{ post. date | date: date_format }}&lt;/p&gt;&lt;/article&gt;{% endfor %} {% endfor %}"
    }, {
    "id": 3,
    "url": "https://adityak2920.github.io/images/copied_from_nb/",
    "title": "",
    "body": "WarningDo not manually save images into this folder. This is used by GitHub Actions to automatically copy images.  Any images you save into this folder could be deleted at build time. "
    }, {
    "id": 4,
    "url": "https://adityak2920.github.io/object%20detection/vision/2020/03/18/FasterRCNN.html",
    "title": "Faster RCNN",
    "body": "2020/03/18 -           Introduction : Object detection is one of the areas of computer vision that is maturing very rapidly. "
    }, {
    "id": 5,
    "url": "https://adityak2920.github.io/self-supervised/vision/2020/02/26/SSL.html",
    "title": "Self Supervised Learning",
    "body": "2020/02/26 -           What is Self Supervised Learning ? : Self Supervised Learning(SSL) is a method to train neural networks in which we don't require any extra labels, we take labels from the input data itself. It's not a very new concept, we are using SSL in NLP from quite some time to train language models, in which we train our model to predict next word of a sentence given a word. It's proved to give accuracies a large boost in NLP tasks beacuse it's observed that a model which learns the nature or the way to generate nature language, can be fine tuned for any task. SSL in Computer Vision : In computer vision, it's not being used frequently beacuse we became satisfied or dependent on Imagenet pretrained weights and nowadays also on COCO for detection and segmentation tasks. But in medical domain, these weights don't proved to be very ground breaking, it improved results a little bit but not to a large margin and the same time in these domains, there is not much data available right now. So, for these SSL proved to be a very good option. In SSL, there are mainly two types of tasks:- Pretext Tasks: The tasks which we use for pretraining our network are pretext tasks. Downstream Tasks: The tasks which we use for fine-tuning our network are downstream tasks. The pretext tasks can be Colorization, Inpainting, Placing image pathches in the right place, Classify Corrupted Images, etc. One thing we should be taken into account is that the pretext task should be choosen such that it should give an understanding of data and so that it makes easier to solve downstream task. It's suggested that we should not be spending too much time in deciding pretext task, we should build an easy and fast task. After that spending time in finetuning through downstream task to check whether it's working or not. Unsupervised Data Augmentation and Consistency Loss : In July 2019 a paper from google came to show, how we can use data augmentation on unlabeled data to improve accuracy.   Now, In this paper they proposed a method for training called Unsupervised Data Augmentation. In this method they are usingboth labelled and unlabelled data for training with a loss function combining both the loss functions from data. One loss function function is computed from labelled data by supervised learning methods and the other loss is computed from consistency training by enforcing a model to predict similar predictions from augmented and unaugmented unlabelled data. The same model is used for computing both the loss function. The loss which we are getting from unlablled data is called Consistency Loss or Noise Contrastive Estimation. From statistical point, it is basically distance between two prediction distribution. The pretext tasks messes with data in different ways through augmentation but we always want that the prediction with original and messed should be same and the intermediate representation should also be consistent, otherwise it will affect our predictions. At final, we add both the loss functions to train beacuse it penalizes our model for getting different prediction for differnt version of the same data. Credits : I wrote this blog after reading Jeremy Howard blog on Self Supervised learning just to improve my writing skills and to learn concepts in a better fashion. Links: Jeremy Howard Blog                          Unsupervised Data Augmentation"
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')
    this.metadataWhitelist = ['position']

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}