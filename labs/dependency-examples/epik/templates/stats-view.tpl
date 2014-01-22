<span id="todo-count">
	<strong>{{model#remaining}}</strong> item{{model#remaining | plural}} left
</span>
<ul id="filters">
	<li>
		<a class="all selected" href="#!/">All</a>
	</li>
	<li>
		<a class="active" href="#!/active">Active</a>
	</li>
	<li>
		<a class="completed" href="#!/completed">Completed</a>
	</li>
</ul>
<button ep-show="model#completed" ep-on-click="clear" id="clear-completed">Clear completed ({{model#completed}})</button>
