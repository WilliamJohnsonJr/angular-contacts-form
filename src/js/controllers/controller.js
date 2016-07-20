function Controller ($scope) {
	$scope.comments = [];	

$scope.submitForm = function (name, email, website, message){
		let newComment = {
			id: "Comment " + ($scope.comments.length + 1),
			name: name,
			email: email,
			website: website,
			message: message
		}

		$scope.comments.push(newComment);

		function printComment(){

		}

		$scope.name= '';
		$scope.email='';
		$scope.website='';
		$scope.message='';
}

}

Controller.$inject = ['$scope'];
export { Controller };