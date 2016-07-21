function Controller ($scope, SERVER, $http) {

	$scope.comments = [];

	init();

	function init () {
    $http.get(SERVER.URL).then( (response) => {
    		console.log(response.data);
			$scope.comments = response.data;
    		console.log($scope.comments);
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
				if(website !== undefined && (website.substring(0,7) ==='http://' || website.substring(0,8)==="https://")){
					if(message !== undefined) {
						let newComment = {
							commentNumber: "Comment " + ($scope.comments.length + 1),
							name: "Posted By: "+ name,
							email: "Email: "+email,
							website: "Website: "+website,
							message: "Message: "+message
						}
					    $http.post(SERVER.URL, newComment).then( (response) => {
					    	newComment._id = response._id;
					    	$scope.comments.push(response.data);
					    });
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

		if(email ===undefined || email === ""){
			$scope.errors.emailError = "Email cannot be left empty"
		} else if (!email.includes('@')){
			$scope.errors.emailError = "Email must contain an '@'";
		} else {
			$scope.errors.emailError = "";
		};

		if(website === undefined || website===""){
			$scope.errors.websiteError = "Website cannot be left empty";
		} else if (website.substring(0,7) !=="http://") {
			if (website.substring(0,8)!=="https://"){
				$scope.errors.websiteError = "Website must begin with 'http://' or 'https://'";
			} else{
			$scope.errors.websiteError = "";
			}
		} else {
			$scope.errors.websiteError = "";
		}

		if (message === undefined || message==="") {
			$scope.errors.messageError = "Message cannot be left empty";
		} else {
			$scope.errors.messageError = "";
		};
	}

	$scope.deleteComment = (commentID) =>{
		console.log(commentID);
		$http.delete(SERVER.URL + commentID).then( (response) => {
			$scope.comments = $scope.comments.filter((c)=>{
				return c._id !== commentID;
			});
		});
	};	

};

Controller.$inject = ['$scope', 'SERVER', '$http'];
export { Controller };