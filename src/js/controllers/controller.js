function Controller ($scope, SERVER, $http) {

	$scope.comments = [];

	init();

	function init () {
    $http.get(SERVER.URL).then( (results) => {
    		$scope.comments = results.data;
    	});
  	}

	$scope.errors = {
		nameError: '',
		emailError: '',
		websiteError: '',
		messageError: ''
	}	

	$scope.submitForm = function (name, email, website, message){
		if(name !== undefined){
			if(email !== undefined && email.includes('@')){
				if(website !== undefined && website.substring(0,7) ==='http://' || website.substring(0,8)==="https://"){
					if(message !== undefined) {
						let newComment = {
							id: "Comment " + ($scope.comments.length + 1),
							name: "Posted By: "+ name,
							email: "Email: "+email,
							website: "Website: "+website,
							message: "Message: "+message
						}

						$scope.comments.push(newComment);
						$scope.name= '';
						$scope.email='';
						$scope.website='';
						$scope.message='';
					} 
				} 
			} 
		} 
		if(name === undefined || name === "") {
			$scope.errors.nameError = "Name cannot be left empty";
		} else {
			$scope.errors.nameError = "";
		};

		if(email ===undefined || !email.includes('@')){
			$scope.errors.emailError = "Email must contain an '@'";
		} else {
			$scope.errors.emailError = "";
		};

		if(website === undefined || website.substring(0,7) !=="http://" || website.substring(0,8)!=="https://") {
			$scope.errors.websiteError = "Website must begin with 'http://' or 'https://'";
		} else{
			$scope.errors.websiteError = "";
		};

		if (message === undefined || message==="") {
			$scope.errors.messageError = "Message cannot be left empty";
		} else {
			$scope.errors.messageError = "";
		};
	}

	$scope.addComment = (c) => {
	    $http.post(SERVER.URL, c).then( (results) => {
	    	$scope.comments.push(results.data);
	    	$scope.c = {};
	    });
	}

	$scope.deleteComment = (commentID) =>{
		$http.delete(SERVER.URL + commentID).then( (results) => {
			$scope.comments = $scope.comments.filter((c)=>{
				return c.id !== commentID;
			});
		});
	};	

Controller.$inject = ['$scope', 'SERVER', '$http'];
export { Controller };